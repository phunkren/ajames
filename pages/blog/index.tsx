import { useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  ChevronUpIcon,
  Cross2Icon,
  DropdownMenuIcon,
} from "@radix-ui/react-icons";
import { BlogCard } from "../../components/Card";
import { Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextAux, TextTitle1, TextTitle2 } from "../../components/Text";
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
import { Button, StyledIconButton } from "../../components/Button";
import {
  BlogSubscribeLink,
  StyledClearFilterLink,
  StyledIconLink,
} from "../../components/Link";
import getConfig from "next/config";
import { ICON_SIZE } from "../../util/images";
import {
  PostCategoriesCount,
  PostTotalCount,
  PostActiveTags,
  StyledFilterTag,
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

const { publicRuntimeConfig } = getConfig();

export const getStaticProps: GetStaticProps = async () => {
  // Grab all blogs from Notion
  const posts = await getPosts();
  const sortedPosts = sortPosts(posts);
  const postTags = getTags(posts);

  if (publicRuntimeConfig.PRODUCTION) {
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

  function handleFilterClear() {
    push({ pathname }, undefined, {
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
                <BlogSubscribeLink
                  type="icon"
                  css={{ display: "flex", "@bp2": { display: "none" } }}
                />

                <BlogSubscribeLink
                  type="button"
                  css={{ display: "none", "@bp2": { display: "flex" } }}
                />
              </Box>

              <Box justifyContent="space-between" alignItems="flex-end">
                <Box as="ul" role="list" direction="vertical" gap={6} flexGrow>
                  <PostTotalCount total={posts.length} icon />
                  <PostCategoriesCount total={tags.length} icon />
                  <PostActiveTags tags={tags} queryTags={queryTags} icon />
                </Box>

                <Box
                  direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
                  gap={4}
                  justifyContent={{
                    "@initial": "flex-end",
                    "@bp2": "flex-end",
                  }}
                  alignItems={{ "@initial": "flex-end", "@bp2": "center" }}
                >
                  {queryTags.length ? (
                    <StyledIconLink
                      href={{ pathname: "blog" }}
                      title="Clear Filters"
                      nextLinkProps={{ scroll: false }}
                    >
                      <VisuallyHidden.Root>
                        <TextAux>Clear filters</TextAux>
                      </VisuallyHidden.Root>
                      <Cross2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} />
                    </StyledIconLink>
                  ) : null}

                  <Collapsible.Trigger asChild>
                    <StyledIconButton
                      title={
                        isFiltersOpen ? "Collapse Filters" : "Expand Filters"
                      }
                    >
                      {isFiltersOpen ? (
                        <>
                          <VisuallyHidden.Root>
                            <TextAux>Close filter menu</TextAux>
                          </VisuallyHidden.Root>
                          <ChevronUpIcon
                            width={ICON_SIZE.m}
                            height={ICON_SIZE.m}
                          />
                        </>
                      ) : (
                        <>
                          <VisuallyHidden.Root>
                            <TextAux>Open filter menu</TextAux>
                          </VisuallyHidden.Root>
                          <DropdownMenuIcon
                            width={ICON_SIZE.m}
                            height={ICON_SIZE.m}
                          />
                        </>
                      )}
                    </StyledIconButton>
                  </Collapsible.Trigger>
                </Box>
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
