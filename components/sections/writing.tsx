import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import { BlogCard, StyledBlogContent, StyledCardInner } from "../Card";
import { ActionButtons, HeroLayout } from "../Layout";
import { LayoutToggle } from "../Toggle";
import { TagDrawer, TagSelect, TagSelectItem } from "../Tags";
import { TextAux, TextBody, TextTitle2, TextTitle3 } from "../Text";
import { styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../util/notion";
import { filterPosts } from "../../util/notion";
import { Divider } from "../Divider";
import { FilterClearButton } from "../Button";
import { BlogSubscriptionLink, Link } from "../Link";
import {
  TotalCategories,
  TotalPosts,
  ActiveTag,
  Frontmatter,
  PostTags,
} from "../Frontmatter";
import { Box } from "../Box";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export type Props = {
  posts: BlogPost[];
  tags: Tag[];
};

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: "$1",
  boxShadow: "$1",
});

const StyledCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "$2",
  gridRowGap: "$10",
  borderRadius: "$1",
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
        top: 0,
        padding: "0 $6 $6",
      },

      [`${StyledBlogContent}`]: {
        top: 32,
      },

      [`${TextTitle3}`]: {
        fontSize: "1.6em",
        ["-webkit-line-clamp"]: "4",
      },

      [`& a ${TextAux}`]: {
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

      [`${StyledCardInner}`]: {
        top: 0,
        padding: "0 $6 $6",
      },

      [`${StyledBlogContent}`]: {
        top: 32,
      },

      [`${TextTitle3}`]: {
        fontSize: "1.6em",
        ["-webkit-line-clamp"]: "4",
      },

      [`& a ${TextAux}`]: {
        fontSize: "1.1em",
        ["-webkit-line-clamp"]: "6",
      },
    },
  },
});

export const WRITING_ID = "writing";

export const Writing = ({ posts, tags }: Props) => {
  const { pathname, push, query } = useRouter();
  const queryTag = query.tag as string;
  const filteredPosts = filterPosts(posts, queryTag);
  const featuredPost = posts.find(
    (post) =>
      post.properties.slug.rich_text[0].plain_text === "accessible-menubar"
  );

  const [storageLayout, setStorageLayout] = useLocalStorage<string>(
    "layout",
    "grid"
  );

  const handleTagChange = useCallback(
    (tagName: string) => {
      const activeTag = query.tag as string;
      const isTagActive = activeTag === tagName;

      const tag = isTagActive ? undefined : tagName;

      push({ pathname, query: { ...query, tag } }, undefined, {
        scroll: false,
      });
    },
    [pathname, push, query]
  );

  const handleLayoutChange = useCallback(
    (checked: boolean) => {
      setStorageLayout(checked ? "grid" : "rows");
    },
    [setStorageLayout]
  );

  return (
    <Box
      id={WRITING_ID}
      as="section"
      direction="vertical"
      spacingBottom={10}
      display={{ print: "none", "@initial": "flex" }}
      gap={10}
    >
      <HeroLayout />

      <Box
        direction="vertical"
        gap={10}
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
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
              <ActiveTag tags={tags} queryTag={queryTag} icon />
            </Frontmatter>

            <ActionButtons css={{ flexBasis: "fit-content" }}>
              <FilterClearButton filter={queryTag} />

              <TagDrawer tags={tags} onClick={handleTagChange} />

              <TagSelect value={queryTag} onValueChange={handleTagChange}>
                {tags.map((tag) => (
                  <TagSelectItem
                    key={tag.id}
                    id={tag.name}
                    color={tag.color}
                    value={tag.name}
                  />
                ))}
              </TagSelect>
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
                  spacingBottom={{ "@initial": 8, "@bp3": 0 }}
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
                      as="div"
                      tags={featuredPost.properties.tags.multi_select}
                    />
                  </Box>

                  <TextBody
                    clamp={3}
                    textAlign={{ "@initial": "left", "@bp3": "justify" }}
                    color="secondary"
                  >
                    {featuredPost.properties.abstract.rich_text[0].plain_text}
                  </TextBody>

                  <Box>
                    <Link
                      href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                      variant="tertiary"
                    >
                      <TextAux>Read the article</TextAux>
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
              aria-label="Articles layout"
              defaultChecked={storageLayout === "grid"}
              value={storageLayout}
              onCheckedChange={handleLayoutChange}
            />
          </Box>

          <StyledCardContainer
            display={storageLayout === "grid" ? "grid" : "none"}
          >
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

          <Box
            as="ul"
            direction="vertical"
            gap={10}
            display={storageLayout === "rows" ? "flex" : "none"}
          >
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
        </Box>
      </Box>
    </Box>
  );
};
