import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BlogCard } from "../../components/Card";
import { Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextTitle1 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../util/date";
import { styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../types/notion";
import { filterPosts, getTags, sortPosts } from "../../util/posts";
import { getPosts } from "../../lib/notion";

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
  gridRowGap: "$4",
  borderRadius: 4,
  width: "100%",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "$4",
    gridRowGap: "$8",
  },

  "@bp3": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "$5",
    gridRowGap: "$10",
  },
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
      <Box direction="vertical" gap={10} alignItems="center">
        <TextTitle1>BLOG</TextTitle1>

        <nav aria-label="Blog categories">
          <Box direction="horizontal" as="ul" role="list" gap={5}>
            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "professional" } }}
                onClick={() => setActiveTagId(undefined)}
              >
                Professional
              </Link>
            </li>

            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "personal" } }}
                onClick={() => setActiveTagId(undefined)}
              >
                Personal
              </Link>
            </li>
          </Box>
        </nav>

        <TagToggle tags={tags} value={activeTagId} onChange={handleTagChange} />

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
