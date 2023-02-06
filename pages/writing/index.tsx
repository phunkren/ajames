import { ReactElement, useCallback } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import {
  BlogCard,
  StyledBlogContent,
  StyledCardImage,
  StyledCardInner,
} from "../../components/Card";
import { ActionButtons, HeroLayout, Layout } from "../../components/Layout";
import { LayoutToggle } from "../../components/Toggle";
import { TagDropdown, TagDropdownItem } from "../../components/Tags";
import {
  TextAux,
  TextBody,
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
  PostTags,
} from "../../components/Frontmatter";
import banner from "../../public/images/test.jpg";
import { Box } from "../../components/Box";
import { NextPageWithLayout } from "../_app";
import { useLocalStorage } from "../../hooks/useLocalStorage";

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

      [`${StyledCardInner}`]: {
        top: 32,
      },

      [`${StyledCardImage}`]: {
        top: 32,
      },

      [`${StyledBlogContent}`]: {
        top: 32,
      },

      [`${TextTitle3}`]: {
        fontSize: "1.6em",
        ["-webkit-line-clamp"]: "4",
      },

      [`${TextAux}`]: {
        fontSize: "1.1em",
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
        fontSize: "1.6em",
        ["-webkit-line-clamp"]: "4",
      },

      [`${TextAux}`]: {
        fontSize: "1.1em",
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
  const queryTags = getQueryTags(query);
  const filteredPosts = filterPosts(posts, queryTags);
  const featuredPost = posts.find(
    (post) =>
      post.properties.slug.rich_text[0].plain_text === "accessible-menubar"
  );

  const [storageLayout, setStorageLayout] = useLocalStorage<string>(
    "layout",
    "grid"
  );

  const handleTagChange = useCallback(
    (e: Event) => {
      const tagTarget = e.target as HTMLElement;
      const tagName = tagTarget.id;
      const activeTags = getQueryTags(query);
      const isTagActive = activeTags.includes(tagName);
      const tag = isTagActive
        ? activeTags.filter((t) => t !== tagName)
        : [...activeTags, tagName];

      console.log({ a: getQueryTags(query), tagName });

      push({ pathname, query: { ...query, tag } }, undefined, {
        scroll: false,
      });
    },
    [pathname, push, query]
  );

  const handleLayoutChange = useCallback(
    (newLayout: string) => {
      if (newLayout) {
        setStorageLayout(newLayout);
      }
    },
    [setStorageLayout]
  );

  return (
    <Box direction="vertical" spacingBottom={10} gap={10}>
      <HeroLayout src={banner} />

      <Box
        direction="vertical"
        gap={10}
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        spacingTop={{ "@initial": 1, "@bp2": 9 }}
        spacingBottom={10}
      >
        <Box direction="vertical" gap={10}>
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

              <TagDropdown>
                {tags.map((tag) => (
                  <TagDropdownItem
                    key={tag.name}
                    id={tag.name}
                    color={tag.color}
                    name={tag.name}
                    onSelect={handleTagChange}
                  />
                ))}
              </TagDropdown>
            </ActionButtons>
          </Box>
        </Box>

        <Box spacingVertical={10}>
          <Divider />
        </Box>

        {featuredPost ? (
          <>
            <Box direction="vertical">
              <Box spacingBottom={8}>
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

                <Box direction="vertical" gap={4}>
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

                  <Box>
                    <PostTags
                      tags={featuredPost.properties.tags.multi_select}
                    />
                  </Box>

                  <TextBody clamp={3} textAlign="justify">
                    {featuredPost.properties.abstract.rich_text[0].plain_text}
                  </TextBody>

                  <Box>
                    <Link
                      href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                      variant="tertiary"
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
          <Box
            gap={4}
            justifyContent="space-between"
            alignItems="center"
            spacingBottom={8}
          >
            <Box>
              <TextTitle3 as="h2">Articles</TextTitle3>
            </Box>

            <LayoutToggle
              type="single"
              aria-label="Article layout"
              value={storageLayout}
              onValueChange={handleLayoutChange}
            />
          </Box>

          {storageLayout === "grid" ? (
            <StyledCardContainer>
              {filteredPosts.map((post) => {
                return (
                  <BlogCard
                    key={post.id}
                    url={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                    image={post.cover.external.url}
                    emoji={post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"}
                    title={post.properties.page.title[0].plain_text}
                    description={
                      post.properties.abstract.rich_text[0].plain_text
                    }
                    publishDate={post.properties.date.date.start}
                    tags={post.properties.tags.multi_select}
                  />
                );
              })}
            </StyledCardContainer>
          ) : null}

          {storageLayout === "rows" ? (
            <Box as="ul" direction="vertical" gap={10}>
              {filteredPosts.map((post) => {
                return (
                  <Box as="li" key={post.id}>
                    <Box as="article" direction="vertical">
                      <Link
                        href={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                        variant="primary"
                      >
                        <TextTitle3>
                          {post.properties.page.title[0].plain_text}
                        </TextTitle3>
                      </Link>

                      <TextBody
                        color="secondary"
                        textAlign="justify"
                        css={{
                          maxWidth: "none",
                          spacingBottom: "$2",
                          "@bp3": { maxWidth: "75%" },
                        }}
                      >
                        {post.properties.abstract.rich_text[0].plain_text}
                      </TextBody>

                      <PostTags
                        as="div"
                        tags={post.properties.tags.multi_select}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

Writing.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Writing;
