import { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { BlogCard } from "../../components/Card";
import { Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextTitle1, TextTitle2 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../util/date";
import { styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../types/notion";
import { filterPosts, getTags, sortPosts } from "../../util/posts";
import { getPosts } from "../../lib/notion";
import { Link } from "../../components/Link";
import { Divider } from "../../components/Divider";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { blackA } from "@radix-ui/colors";
import Image from "next/image";

type Props = {
  professional: {
    posts: BlogPost[];
    tags: Tag[];
  };
  personal: {
    posts: BlogPost[];
    tags: Tag[];
  };
};

const StyledCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "$2",
  gridRowGap: "$7",
  borderRadius: 4,
  width: "100%",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "$7",
    gridRowGap: "$7",
  },

  "@bp3": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "$5",
    gridRowGap: "$10",
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 4,
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
});

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      personal: {
        posts: sortPosts(posts.personal),
        tags: getTags(posts.personal),
      },
      professional: {
        posts: sortPosts(posts.professional),
        tags: getTags(posts.professional),
      },
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

function Blog(props: Props) {
  const [activeTagId, setActiveTagId] = useState<string>();

  const { pathname, push, query } = useRouter();

  const { personal, professional } = props;

  const { posts, tags } = query.tab === "personal" ? personal : professional;

  const filteredPosts = query.tag ? filterPosts(posts, query.tag) : posts;

  function handleTagChange(tagName: string) {
    push({
      pathname,
      query: {
        ...query,
        tag: tagName,
      },
    });
  }

  return (
    <Layout>
      <Box
        direction="vertical"
        gap={10}
        alignItems="center"
        spacingTop={{ "@initial": 4, "@bp2": 7 }}
        spacingBottom={10}
      >
        <VisuallyHidden.Root>
          <TextTitle1>Blog</TextTitle1>
        </VisuallyHidden.Root>

        <AspectRatio ratio={2.84 / 1}>
          <StyledImage
            src="/images/blog.jpg"
            alt=""
            sizes="100vw"
            priority
            fill
          />
        </AspectRatio>

        <Box as="nav" aria-label="Blog categories">
          <Box as="ul" role="list" gap={10}>
            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "professional" } }}
                variant="secondary"
                onClick={() => setActiveTagId(undefined)}
              >
                <TextTitle2>Professional</TextTitle2>
              </Link>
            </li>

            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "personal" } }}
                variant="secondary"
                onClick={() => setActiveTagId(undefined)}
              >
                <TextTitle2>Personal</TextTitle2>
              </Link>
            </li>
          </Box>
        </Box>

        <Divider />

        <TagToggle tags={tags} value={activeTagId} onChange={handleTagChange} />

        <Divider />

        <StyledCardContainer>
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              url={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
              image={post.cover.external.url}
              emoji={post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"}
              title={post.properties.page.title[0].plain_text}
              publishDate={post.properties.date.date.start}
              readingTime={8}
              tags={post.properties.tags.multi_select}
            />
          ))}
        </StyledCardContainer>
      </Box>
    </Layout>
  );
}

export default Blog;
