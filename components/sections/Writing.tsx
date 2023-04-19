import { Fragment, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import {
  BlogCard,
  BlogSponsored,
  StyledBlogContent,
  StyledCardInner,
} from "../Card";
import { ActionButtons } from "../Layout";
import { LayoutToggle } from "../Toggle";
import { StyledTag, TagDrawer, TagSelect, TagSelectItem } from "../Tags";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../Text";
import { css, styled } from "../../stitches.config";
import { BlogPost, Tag } from "../../util/notion";
import { filterPosts } from "../../util/notion";
import { Divider } from "../Divider";
import { Button, FilterClearButton, ShareButton } from "../Button";
import { BlogSubscriptionLink, BuyMeCoffeeLink, Link } from "../Link";
import {
  TotalCategories,
  TotalPosts,
  ActiveTag,
  Frontmatter,
  PostTags,
} from "../Frontmatter";
import { Box } from "../Box";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import book from "../../public/images/book.png";
import { H2_STYLES, H3_STYLES } from "../../styles/text";

export type Props = {
  posts: BlogPost[];
  tags: Tag[];
};

const StyledHeroImage = styled(Image, {
  objectFit: "contain",
  position: "absolute",
  pointerEvents: "none",
});

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
  background: "$slate2",

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "50%",
    backgroundColor: "$slate2",
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
    backgroundColor: "$slate2",
    transform: "skewY(2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },
});

export const WRITING_ID = "writing";

const Writing = ({ posts, tags }: Props) => {
  const { push, query } = useRouter();
  const [display, setDisplay] = useState<"partial" | "all">("partial");
  const queryTag = query.tag as string;

  const filteredPosts = filterPosts(posts, queryTag);
  const filteredTag = queryTag
    ? tags.find((tag) => tag.name === queryTag)
    : undefined;

  const displayedPosts =
    display === "partial" ? filteredPosts.slice(0, 6) : filteredPosts;

  const shouldShowMore = displayedPosts < filteredPosts;

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

      push(
        { pathname: "/", hash: "writing", query: { ...query, tag } },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [push, query]
  );

  const handleLayoutChange = useCallback(
    (checked: boolean) => {
      setStorageLayout(checked ? "grid" : "rows");
    },
    [setStorageLayout]
  );

  const handleDisplayChange = useCallback(() => {
    setDisplay("all");
  }, []);

  return (
    <Box
      as="section"
      display={{ print: "none", "@initial": "flex" }}
      direction="vertical"
      spacingVertical={{ "@print": 0, "@initial": 12 }}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        id={WRITING_ID}
        direction="vertical"
        gap={12}
        container="l"
        spacingVertical={{ "@print": 0, "@initial": 10, "@bp2": 12 }}
        css={{ zIndex: "$1" }}
      >
        <Box>
          <AspectRatio.Root ratio={2.5 / 1} asChild>
            <StyledHeroImage
              src={book}
              alt=""
              sizes="(max-width: 1280px) 50vw, 33vw"
              fill
            />
          </AspectRatio.Root>
        </Box>

        <Box direction="vertical" gap={10}>
          <Box justifyContent="space-between" alignItems="center">
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

          <Box>
            <Divider />
          </Box>
        </Box>

        {featuredPost ? (
          <Box direction="vertical">
            <Box spacingBottom={8}>
              <TextTitle2>Featured</TextTitle2>
            </Box>

            <Box
              gap={{ "@initial": 0, "@bp3": 10 }}
              direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
            >
              <Box
                direction="vertical"
                spacingBottom={{ "@initial": 8, "@bp3": 0 }}
                css={{
                  "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: "50%" },
                }}
              >
                <AspectRatio.Root ratio={16 / 9}>
                  <StyledImage
                    src={featuredPost.cover.external.url}
                    sizes="(max-width: 1020px) 100vw, 50vw"
                    fill
                    alt=""
                  />
                </AspectRatio.Root>
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
        ) : null}

        <Box direction="vertical">
          <Box
            gap={4}
            justifyContent="space-between"
            alignItems="center"
            spacingBottom={8}
          >
            <Box gap={4} alignItems="center">
              <TextTitle2>Articles</TextTitle2>
              {filteredTag ? (
                <StyledTag
                  borderColor={filteredTag.color}
                  compact
                  alignItems="center"
                >
                  <TextAux>{filteredTag.name}</TextAux>
                </StyledTag>
              ) : null}
            </Box>

            <LayoutToggle
              aria-label="Articles layout"
              defaultChecked={storageLayout === "grid"}
              value={storageLayout}
              onCheckedChange={handleLayoutChange}
            />
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

                    {i === 2 ? <BlogSponsored /> : null}
                  </Fragment>
                );
              })}

              {shouldShowMore ? (
                <Box direction="vertical">
                  <Button css={{ flexGrow: 1 }} onClick={handleDisplayChange}>
                    <TextHeadline color="secondary">
                      Show all articles
                    </TextHeadline>
                  </Button>
                </Box>
              ) : null}
            </StyledCardContainer>
          </Box>

          <Box
            as="ul"
            direction="vertical"
            gap={10}
            display={storageLayout === "rows" ? "flex" : "none"}
          >
            {displayedPosts.map((post, i) => {
              return (
                <Fragment key={post.id}>
                  <Box as="li">
                    <Box as="article" direction="vertical" gap={1}>
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
                          "@bp3": { maxWidth: "66%" },
                        }}
                      >
                        {post.properties.abstract.rich_text[0].plain_text}
                      </TextBody>

                      <PostTags
                        as="div"
                        tags={post.properties.tags.multi_select}
                        compact
                      />
                    </Box>
                  </Box>

                  {i === 2 ? (
                    <Box as="li" key="advert">
                      <Box as="article" direction="vertical">
                        <TextTitle3 css={{ color: "$focus" }}>
                          Enjoying the blog?
                        </TextTitle3>

                        <TextBody
                          color="secondary"
                          textAlign="justify"
                          css={{
                            maxWidth: "none",
                            spacingBottom: "$2",
                            "@bp3": { maxWidth: "66%" },
                          }}
                        >
                          You can support my work and stay updated by following
                          the&nbsp;
                          <Link href="/rss" variant="tertiary">
                            RSS Feed
                          </Link>
                          . You can also&nbsp;
                          <BuyMeCoffeeLink />.
                        </TextBody>

                        <PostTags
                          as="div"
                          tags={[
                            {
                              id: "sponsored",
                              name: "Sponsored",
                              color: "default",
                            },
                          ]}
                          compact
                        />
                      </Box>
                    </Box>
                  ) : null}
                </Fragment>
              );
            })}

            {shouldShowMore ? (
              <Box as="li">
                <Button
                  variant="tertiary"
                  css={{ width: "fit-content" }}
                  onClick={handleDisplayChange}
                >
                  <TextTitle3>Show all articles</TextTitle3>
                </Button>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Writing;
