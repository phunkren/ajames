import { Fragment, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import { css, styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../util/notion";
import { filterPosts } from "../../util/notion";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { H2_STYLES, H3_STYLES } from "../../styles/text";
import {
  BlogCard,
  BlogSponsored,
  StyledBlogContent,
  StyledCardInner,
} from "../Card";
import { ActionButtons } from "../Layout";
import { LayoutToggle } from "../Toggle";
import { TagDrawer, TagSelect, TagSelectItem } from "../Tags";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../Text";
import { Divider } from "../Divider";
import { Button, FilterClearButton, IconButton } from "../Button";
import { BlogSubscriptionLink, BuyMeCoffeeLink, Link } from "../Link";
import {
  TotalCategories,
  TotalPosts,
  ActiveTag,
  Frontmatter,
  PostTags,
} from "../Frontmatter";
import { Box } from "../Box";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Tooltip } from "../Tooltip";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export type Props = {
  posts: BlogPost[];
  tags: Tag[];
};

const StyledImage = styled(Image, {
  objectFit: "cover",
  position: "absolute",
  pointerEvents: "none",
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

      h3: {
        ...H2_STYLES,
        ["-webkit-line-clamp"]: "5",
      },

      [`& a ${TextAux}`]: {
        ...H3_STYLES,
        ["-webkit-line-clamp"]: "7",
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

      h3: {
        ...H2_STYLES,
        ["-webkit-line-clamp"]: "5",
      },

      [`& a ${TextAux}`]: {
        ...H3_STYLES,
        fontWeight: 400,
        ["-webkit-line-clamp"]: "6",
      },
    },
  },
});

const bg = css({
  position: "relative",
  background: `$slate1`,

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "50%",
    backgroundColor: `$slate1`,
    transform: "skewY(-2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },

  "&::after": {
    content: "",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "200%",
    height: "50%",
    backgroundColor: `$slate1`,
    transform: "skewY(2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },
});

export const WRITING_ID = "writing";

export const ARTICLES_ID = "articles";

export const Writing = ({ posts, tags }: Props) => {
  const { replace, query } = useRouter();
  const page = Number(query.writingPage ?? 1);
  const queryTag = query.tag as string;

  const [storageLayout, setStorageLayout] = useLocalStorage<string>(
    "layout",
    "grid"
  );

  const featuredPost = posts.find(
    (post) =>
      post.properties.slug.rich_text[0].plain_text === "synchronize-content"
  );

  const filteredPosts = filterPosts(posts, featuredPost, queryTag);

  const perPage = page === 1 ? 7 : 8;
  const items = (page - 1) * perPage;
  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const displayedPosts = filteredPosts.slice(items, items + perPage);

  const handleTagChange = useCallback(
    (tagName: string) => {
      const { writingPage, ...restOfQuery } = query;
      replace(
        {
          pathname: "/",
          hash: "writing",
          query: {
            ...restOfQuery,
            tag: tagName.toLowerCase(),
          },
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        }
      );
    },
    [replace, query]
  );

  const handleLayoutChange = useCallback(
    (checked: boolean) => {
      setStorageLayout(checked ? "grid" : "rows");
    },
    [setStorageLayout]
  );

  const handlePageBack = useCallback(() => {
    replace(
      {
        pathname: "/",
        hash: "articles",
        query: { ...query, writingPage: page - 1 },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [query, replace, page]);

  const handlePageForward = useCallback(() => {
    replace(
      {
        pathname: "/",
        hash: "articles",
        query: { ...query, writingPage: page + 1 },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [query, replace, page]);

  return (
    <Box
      as="section"
      display={{ "@print": "none", "@initial": "flex" }}
      direction="vertical"
      spacingTop={{ "@initial": 11, "@bp2": 10, "@bp3": 11 }}
      spacingBottom={{ "@print": 0, "@initial": 12 }}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        direction="vertical"
        gap={12}
        container="l"
        spacingBottom={{ "@print": 0, "@initial": 10, "@bp2": 11 }}
        css={{ zIndex: "$1" }}
      >
        <Box direction="vertical" gap={10}>
          <Box direction="vertical">
            <Box
              id={WRITING_ID}
              justifyContent="space-between"
              alignItems="center"
              spacingTop={12}
            >
              <TextTitle1 as="h2">Writing</TextTitle1>

              <BlogSubscriptionLink
                type="icon"
                css={{ display: "flex", "@bp2": { display: "none" } }}
              />

              <Box
                position="relative"
                css={{
                  display: "none",
                  "@bp2": { display: "flex", left: "-$1" },
                }}
              >
                <BlogSubscriptionLink type="button" />
              </Box>
            </Box>
          </Box>

          <Box justifyContent="space-between" alignItems="flex-end" gap={4}>
            <Frontmatter flexGrow>
              <TotalPosts
                filtered={filteredPosts.length}
                total={posts.length}
                icon
              />
              <TotalCategories total={tags.length} icon />
              <ActiveTag tags={tags} queryTag={queryTag} icon />
            </Frontmatter>

            <ActionButtons css={{ flexBasis: "fit-content" }}>
              <LayoutToggle
                aria-label="Articles layout"
                defaultPressed={storageLayout === "grid"}
                value={storageLayout}
                onPressedChange={handleLayoutChange}
              />

              <Box display={{ "@initial": "flex", "@bp2": "none" }}>
                {queryTag ? (
                  <FilterClearButton filter={queryTag} />
                ) : (
                  <TagDrawer tags={tags} onClick={handleTagChange} />
                )}
              </Box>

              <Box display={{ "@initial": "none", "@bp2": "flex" }}>
                {queryTag ? (
                  <FilterClearButton filter={queryTag} />
                ) : (
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
                )}
              </Box>
            </ActionButtons>
          </Box>

          <Box>
            <Divider />
          </Box>
        </Box>

        <Box direction="vertical" gap={11}>
          {featuredPost ? (
            <Box direction="vertical">
              <Box spacingBottom={10}>
                <TextTitle2 as="h3">Featured</TextTitle2>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 11 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={{ "@initial": 10, "@bp3": 0 }}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: "50%" },
                  }}
                >
                  <Link
                    aria-label="Read the article"
                    href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                    css={{ display: "block", width: "100%" }}
                  >
                    <AspectRatio.Root ratio={17 / 10}>
                      <StyledImage
                        src={featuredPost.cover.external.url}
                        sizes="(max-width: 1020px) 100vw, 50vw"
                        fill
                        alt=""
                      />
                    </AspectRatio.Root>
                  </Link>
                </Box>

                <Box direction="vertical" gap={4}>
                  <Link
                    href={`/writing/${featuredPost.properties.slug.rich_text[0].plain_text}`}
                    variant="secondary"
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
                      compact
                      onTagChange={handleTagChange}
                    />
                  </Box>

                  <TextBody
                    clamp={{ "@initial": 5, "@bp3": 3 }}
                    css={{
                      maxWidth: "none",
                      "@bp2": { maxWidth: "75%" },
                    }}
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
          ) : null}

          <Box direction="vertical" id={ARTICLES_ID}>
            <Box spacingBottom={10}>
              <TextTitle2 as="h3">Articles</TextTitle2>
            </Box>

            <Box
              direction="vertical"
              display={storageLayout === "grid" ? "flex" : "none"}
            >
              <StyledCardContainer display="grid">
                {displayedPosts.map((post, i) => {
                  return (
                    <Fragment key={post.id}>
                      <BlogCard
                        url={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                        image={post.cover.external.url}
                        emoji={
                          post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"
                        }
                        title={post.properties.page.title[0].plain_text}
                        description={
                          post.properties.abstract.rich_text[0].plain_text
                        }
                        publishDate={post.properties.date.date.start}
                        tags={post.properties.tags.multi_select}
                      />

                      {page === 1 && i === 2 ? <BlogSponsored /> : null}
                    </Fragment>
                  );
                })}
              </StyledCardContainer>
            </Box>

            <Box
              as="ul"
              direction="vertical"
              gap={11}
              display={storageLayout === "rows" ? "flex" : "none"}
            >
              {displayedPosts.map((post, i) => {
                return (
                  <Fragment key={post.id}>
                    <Box as="li" direction="vertical">
                      <Box as="article" alignItems="baseline">
                        <Box direction="vertical" flexGrow gap={2}>
                          <Balancer>
                            <Link
                              href={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                              variant="secondary"
                            >
                              <TextTitle3>
                                {post.properties.page.title[0].plain_text}
                              </TextTitle3>
                            </Link>
                          </Balancer>

                          <TextBody
                            color="secondary"
                            css={{
                              maxWidth: "none",
                              spacingBottom: "$2",
                              "@bp2": { maxWidth: "75%" },
                              "@bp3": { maxWidth: "66%" },
                            }}
                          >
                            {post.properties.abstract.rich_text[0].plain_text}
                          </TextBody>

                          <Link
                            href={`/writing/${post.properties.slug.rich_text[0].plain_text}`}
                            variant="tertiary"
                          >
                            <TextAux>Read the article</TextAux>
                          </Link>
                        </Box>
                      </Box>
                    </Box>

                    {page === 1 && i === 2 ? (
                      <Box as="li" direction="vertical" key="advert">
                        <Box as="article" alignItems="baseline">
                          <Box direction="vertical" flexGrow gap={2}>
                            <TextTitle3 color="focus">
                              Enjoying the blog?
                            </TextTitle3>

                            <TextBody
                              color="secondary"
                              css={{
                                maxWidth: "none",
                                spacingBottom: "$2",
                                "@bp3": { maxWidth: "66%" },
                              }}
                            >
                              You can support my work and stay updated by
                              following the&nbsp;
                              <Link href="/rss" variant="tertiary">
                                RSS Feed
                              </Link>
                              . You can also&nbsp;
                              <BuyMeCoffeeLink variant="text" />.
                            </TextBody>

                            <Link href="/rss" variant="tertiary">
                              <TextAux>Follow me</TextAux>
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    ) : null}
                  </Fragment>
                );
              })}
            </Box>

            {totalPages > 1 ? (
              <Box
                spacingTop={12}
                gap={10}
                alignItems="center"
                justifyContent="center"
              >
                <Tooltip title="Previous page">
                  <IconButton
                    aria-disabled={page === 1}
                    onClick={handlePageBack}
                  >
                    <VisuallyHidden.Root>Previous page</VisuallyHidden.Root>
                    <ArrowLeftIcon />
                  </IconButton>
                </Tooltip>

                <Button variant="tertiary">
                  <TextHeadline
                    spacing={2}
                    css={{
                      textDecorationColor: "$focus",
                      textUnderlineOffset: "$space$1",
                    }}
                  >
                    {page}
                  </TextHeadline>
                </Button>

                <Tooltip title="Next page">
                  <IconButton
                    aria-disabled={page === totalPages}
                    onClick={handlePageForward}
                  >
                    <VisuallyHidden.Root>Next page</VisuallyHidden.Root>
                    <ArrowRightIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
