import { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Cross2Icon, DropdownMenuIcon } from "@radix-ui/react-icons";
import { BlogCard } from "../../components/Card";
import { Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextTitle1, TextTitle2 } from "../../components/Text";
import { styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../types/notion";
import { filterPosts, getTags, sortPosts } from "../../util/posts";
import { createPosts, generateRSSFeed, getPosts } from "../../lib/notion";
import { Divider } from "../../components/Divider";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { StyledIconButton } from "../../components/Button";
import { BlogSubscribeLink } from "../../components/Link";
import getConfig from "next/config";

type Props = {
  posts: BlogPost[];
  tags: Tag[];
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
  boxShadow: "$verticalOffset",
});

const { publicRuntimeConfig } = getConfig();

export const getStaticProps: GetStaticProps = async () => {
  // Grab all blogs from Notion
  const posts = await getPosts();

  // Create a .mdx file for each blog post
  await createPosts(posts);

  const sortedPosts = sortPosts(posts);
  const postTags = getTags(posts);

  // Create a feed.xml file for blog subscriptions
  if (publicRuntimeConfig.PRODUCTION) {
    generateRSSFeed(sortedPosts);
  }

  return {
    props: {
      posts: sortedPosts,
      tags: postTags,
    },
  };
};

function Blog({ posts, tags }: Props) {
  const { pathname, push, query } = useRouter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const filteredPosts = query.tag ? filterPosts(posts, query.tag) : posts;

  function handleTagChange(tagName: string) {
    push({ pathname, query: { ...query, tag: tagName } }, undefined, {
      scroll: false,
    });
  }

  return (
    <Layout>
      <Box
        direction="vertical"
        alignItems="center"
        spacingTop={{ "@initial": 7, "@bp2": 10 }}
        css={{ marginTop: "$5" }}
        spacingBottom={10}
        gap={10}
      >
        <VisuallyHidden.Root>
          <TextTitle1>Blog</TextTitle1>
        </VisuallyHidden.Root>

        <AspectRatio ratio={2.5 / 1}>
          <StyledImage
            src="/images/blog.jpg"
            alt=""
            sizes="100vw"
            priority
            fill
          />
        </AspectRatio>

        <Box
          direction="vertical"
          gap={10}
          spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
          spacingVertical={10}
        >
          <Collapsible.Root
            open={isFiltersOpen}
            onOpenChange={setIsFiltersOpen}
          >
            <Box gap={4} alignItems="center">
              <Collapsible.Trigger asChild>
                <StyledIconButton title="Filter">
                  <VisuallyHidden.Root>Filters</VisuallyHidden.Root>

                  {isFiltersOpen ? (
                    <Cross2Icon width={18} height={18} />
                  ) : (
                    <DropdownMenuIcon width={18} height={18} />
                  )}
                </StyledIconButton>
              </Collapsible.Trigger>

              <BlogSubscribeLink type="button" css={{ marginLeft: "auto" }} />
            </Box>

            <Box spacingVertical={10}>
              <Divider />
            </Box>

            <Collapsible.Content>
              <TagToggle
                tags={tags}
                value={query.tag as string}
                onChange={handleTagChange}
              />

              <Box spacingVertical={10}>
                <Divider />
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>

          <VisuallyHidden.Root>
            <TextTitle2>Articles</TextTitle2>
          </VisuallyHidden.Root>

          <StyledCardContainer>
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                url={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
                image={post.cover.external.url}
                emoji={post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"}
                title={post.properties.page.title[0].plain_text}
                description={post.properties.abstract.rich_text[0].plain_text}
                publishDate={post.properties.date.date.start}
                tags={post.properties.tags.multi_select}
              />
            ))}
          </StyledCardContainer>
        </Box>
      </Box>
    </Layout>
  );
}

export default Blog;
