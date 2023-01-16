import { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Collapsible from "@radix-ui/react-collapsible";
import { BlogCard } from "../../components/Card";
import { ActionButtons, Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextTitle1, TextTitle2 } from "../../components/Text";
import { styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../types/notion";
import {
  filterPosts,
  getQueryTags,
  getTags,
  sortPosts,
} from "../../util/posts";
import { createPosts, generateRSSFeed, getPosts } from "../../lib/notion";
import { Divider } from "../../components/Divider";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { FilterClearButton, FilterMenuButton } from "../../components/Button";
import { RssSubscribeLink } from "../../components/Link";
import {
  TotalCategories,
  TotalPosts,
  ActiveTags,
  Frontmatter,
} from "../../components/Frontmatter";
import banner from "../../public/images/blog.jpg";

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
});

export const getStaticProps: GetStaticProps = async () => {
  // Grab all blogs from Notion
  const posts = await getPosts();
  const sortedPosts = sortPosts(posts);
  const postTags = getTags(posts);

  if (process.env.NODE_ENV === "production") {
    // Create a .mdx file for each blog post
    await createPosts(posts);

    // Create a feed.xml file for blog subscriptions
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
  const queryTags = getQueryTags(query);
  const filteredPosts = filterPosts(posts, queryTags);

  function handleTagChange(tagName: string[]) {
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
        spacingBottom={10}
        gap={10}
      >
        <VisuallyHidden.Root>
          <TextTitle1>Blog</TextTitle1>
        </VisuallyHidden.Root>

        <AspectRatio ratio={2.5 / 1}>
          <StyledImage
            placeholder="blur"
            src={banner}
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
          spacingTop={4}
          spacingBottom={10}
        >
          <Collapsible.Root
            open={isFiltersOpen}
            onOpenChange={setIsFiltersOpen}
          >
            <Box direction="vertical" gap={10} spacingBottom={10}>
              <Box justifyContent="space-between" alignItems="center">
                <TextTitle2>Blog</TextTitle2>
                <RssSubscribeLink
                  type="icon"
                  css={{ display: "flex", "@bp2": { display: "none" } }}
                />

                <RssSubscribeLink
                  type="button"
                  css={{ display: "none", "@bp2": { display: "flex" } }}
                />
              </Box>

              <Box justifyContent="space-between" alignItems="flex-end">
                <Frontmatter flexGrow>
                  <TotalPosts total={posts.length} icon />
                  <TotalCategories total={tags.length} icon />
                  <ActiveTags tags={tags} queryTags={queryTags} icon />
                </Frontmatter>

                <ActionButtons>
                  <FilterClearButton filters={queryTags} />

                  <Collapsible.Trigger asChild>
                    <FilterMenuButton open={isFiltersOpen} />
                  </Collapsible.Trigger>
                </ActionButtons>
              </Box>
            </Box>

            <Box spacingVertical={10}>
              <Divider />
            </Box>

            <Collapsible.Content>
              <TagToggle
                type="multiple"
                tags={tags}
                value={queryTags}
                onValueChange={handleTagChange}
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
