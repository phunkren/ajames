import { ReactElement, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Balancer from "react-wrap-balancer";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  BlogCard,
  StyledBlogContent,
  StyledDescription,
} from "../../components/Card";
import { ActionButtons, HeroLayout, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import {
  TextAux,
  TextBody,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../../components/Text";
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
import { FilterClearButton, FilterMenuButton } from "../../components/Button";
import { BlogSubscriptionLink, Link } from "../../components/Link";
import {
  TotalCategories,
  TotalPosts,
  ActiveTags,
  Frontmatter,
  PublishDate,
} from "../../components/Frontmatter";
import banner from "../../public/images/test.jpg";
import { Box } from "../../components/Box";
import { NextPageWithLayout } from "../_app";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

type Props = {
  posts: BlogPost[];
  tags: Tag[];
};

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 4,
  boxShadow: "$1",
});

const StyledCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "$2",
  gridRowGap: "$10",
  borderRadius: 4,
  width: "100%",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",

    gridColumnGap: "$6",
    gridRowGap: "$6",
  },

  "@bp3": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "$8",
    gridRowGap: "$8",

    "& > *:nth-child(13n+4)": {
      gridColumn: 1,
      gridRow: "span 1",
    },

    "& > *:nth-of-type(13n+5)": {
      flexDirection: "row",
      gridColumn: "span 2",
      gridRow: "span 1",

      [`${StyledBlogContent}`]: {
        top: 32,
      },

      [`${TextTitle3}`]: {
        fontSize: "1.5em",
      },

      [`${StyledDescription}`]: {
        fontSize: "0.9em",
        ["-webkit-line-clamp"]: "6",
      },
    },

    "& > *:nth-of-type(13n+6)": {
      gridColumn: 1,
      gridRow: "span 1",
    },

    "& > *:nth-child(13n+9)": {
      flexDirection: "row-reverse",
      gridColumn: "span 2",
      gridRow: "span 1",

      [`${StyledBlogContent}`]: {
        top: 32,
      },

      [`${TextTitle3}`]: {
        fontSize: "1.5em",
      },

      [`${StyledDescription}`]: {
        fontSize: "0.9em",
        ["-webkit-line-clamp"]: "6",
      },
    },
  },
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

const Writing: NextPageWithLayout = ({ posts, tags }: Props) => {
  const { pathname, push, query } = useRouter();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const queryTags = getQueryTags(query);
  const filteredPosts = filterPosts(posts, queryTags);
  const featuredPost = posts.find(
    (post) =>
      post.properties.slug.rich_text[0].plain_text === "accessible-menubar"
  );

  function handleTagChange(tagName: string[]) {
    push({ pathname, query: { ...query, tag: tagName } }, undefined, {
      scroll: false,
    });
  }

  return (
    <Box direction="vertical" spacingBottom={10} gap={10}>
      <VisuallyHidden.Root>
        <TextTitle1>Writing</TextTitle1>
      </VisuallyHidden.Root>

      <HeroLayout src={banner} />

      <Box
        direction="vertical"
        gap={10}
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        spacingTop={{ "@initial": 1, "@bp2": 9 }}
        spacingBottom={10}
      >
        <Collapsible.Root open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <Box direction="vertical" gap={10} spacingBottom={10}>
            <Box justifyContent="space-between" alignItems="center">
              <TextTitle2>Writing</TextTitle2>

              <BlogSubscriptionLink
                type="icon"
                css={{ display: "flex", "@bp2": { display: "none" } }}
              />

              <BlogSubscriptionLink
                type="button"
                css={{ display: "none", "@bp2": { display: "flex" } }}
              />
            </Box>

            <Box justifyContent="space-between" alignItems="flex-end" gap={4}>
              <Frontmatter flexGrow>
                <TotalPosts total={posts.length} icon />
                <TotalCategories total={tags.length} icon />
                <ActiveTags tags={tags} queryTags={queryTags} icon />
              </Frontmatter>

              <ActionButtons css={{ flexBasis: "fit-content" }}>
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

        {featuredPost ? (
          <>
            <Box direction="vertical">
              <Box spacingBottom={6}>
                <TextTitle3 as="h2">Featured</TextTitle3>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 10 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={4}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 480 },
                  }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <StyledImage
                      src={featuredPost.cover.external.url}
                      sizes="100vw"
                      fill
                      alt=""
                    />
                  </AspectRatio>
                </Box>

                <Box direction="vertical">
                  <Link
                    href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                    variant="primary"
                  >
                    <TextTitle3>
                      <Balancer>
                        {featuredPost.properties.page.title[0].plain_text}
                      </Balancer>
                    </TextTitle3>
                  </Link>

                  <PublishDate
                    date={featuredPost.properties.date.date.start}
                    spacingTop={2}
                    spacingBottom={6}
                  />

                  <TextBody clamp={3} textAlign="justify">
                    {featuredPost.properties.abstract.rich_text[0].plain_text}
                  </TextBody>

                  <Box spacingTop={3}>
                    <Link
                      href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                      variant="secondary"
                    >
                      <TextAux color="secondary">Read more</TextAux>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box spacingVertical={10}>
              <Divider />
            </Box>
          </>
        ) : null}

        <Box direction="vertical">
          <Box spacingBottom={6}>
            <TextTitle3 as="h2">Articles</TextTitle3>
          </Box>

          <StyledCardContainer>
            {filteredPosts.map((post) => {
              return (
                <BlogCard
                  key={post.id}
                  url={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                  image={post.cover.external.url}
                  emoji={post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"}
                  title={post.properties.page.title[0].plain_text}
                  description={post.properties.abstract.rich_text[0].plain_text}
                  publishDate={post.properties.date.date.start}
                  tags={post.properties.tags.multi_select}
                />
              );
            })}
          </StyledCardContainer>
        </Box>
      </Box>
    </Box>
  );
};

Writing.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Writing;
