import { memo, ReactElement } from "react";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { BlogPost, getRandomPosts, Tag } from "../../util/notion";
import {
  getAllPostIds,
  getPageData,
  getPostData,
  getPostTime,
} from "../../lib/notion";
import { ActionButtons, Layout, LoadingLayout } from "../../components/Layout";
import {
  BlogSubscriptionLink,
  BuyMeCoffeeLink,
  Link,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import {
  Emoji,
  TextAux,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../../components/Text";
import { Divider } from "../../components/Divider";
import {
  Frontmatter,
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { SITE } from "../../util/data";
import { ShareButton } from "../../components/Button";
import { darkTheme, styled } from "../../stitches.config";
import {
  H1_STYLES,
  H2_STYLES,
  H3_STYLES,
  P_BLOG_STYLES,
} from "../../styles/text";
import { Box } from "../../components/Box";
import { NextPageWithLayout } from "../_app";
import dynamic from "next/dynamic";
import { ONE_HOUR_IN_SECONDS } from "../../util/date";
import { GetStaticPaths, GetStaticProps } from "next";
import { Table, TBody, Td, TFoot, Th, THead, Tr } from "../../components/Table";
import Image from "next/image";
import { BLUR_DATA_URL, ICON_SIZE } from "../../util/images";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { BlogCard } from "../../components/Card";
import Head from "next/head";

export type Frontmatter = {
  title: string;
  description: string;
  cover: string;
  emoji: string;
  date: string;
  time: number;
  tags: Tag[];
  canonical?: string;
  related?: BlogPost[];
};

type Props = {
  frontmatter: Frontmatter;
  sectionOne: string;
  sectionTwo: string;
};

type FigureProps = {
  src: string;
  alt: string;
};

const monoLisa = localFont({
  src: [
    {
      path: "../../public/fonts/mono-lisa-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/mono-lisa-regular-italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

const DynamicCode = dynamic(
  () => import("../../components/Code").then((mod) => mod.Code),
  {
    loading: () => <LoadingLayout />,
    ssr: false,
  }
);

const StyledHero = styled(Image, {
  objectFit: "cover",
  width: "100vw !important",
  maxWidth: "100vw !important",

  "@bp3": {
    width: "100% !important",
    maxWidth: "100% !important",
  },
});

const StyledContainer = styled(Box, {
  padding: "0 $4",
  textAlign: "justify",
  hyphens: "auto",

  "@bp2": { padding: "0 $7" },

  h1: {
    ...H1_STYLES,
    marginTop: "$10",
    marginBottom: "$5",
    textAlign: "left",
  },

  h2: {
    ...H2_STYLES,
    marginTop: "$8",
    marginBottom: "$4",
    textAlign: "left",
  },

  h3: {
    ...H3_STYLES,
    marginTop: "$4",
    marginBottom: "$2",
    textAlign: "left",
  },

  p: {
    ...P_BLOG_STYLES,
    color: "$foregroundMuted",
  },

  a: {
    display: "inline",
    color: "$foreground",
    wordBreak: "break-word",
    hyphens: "auto",
    overflowWrap: "break-word",
  },

  "code:not(pre > code)": {
    wordBreak: "break-all",
  },

  table: {
    marginTop: "$10",
    marginBottom: "$10",
  },

  "figure, pre:not(pre > pre)": {
    paddingTop: "$10",
    paddingBottom: "$10",
  },

  "@media(hover)": {
    "a:hover": {
      color: "$foreground",
    },
  },

  figure: {
    width: "auto",
    margin: "0 auto",

    "@bp2": {
      width: "fit-content",
    },
  },

  hr: {
    marginTop: "$12",
    marginBottom: "$12",
  },

  img: {
    position: "relative",
    left: "-$7",
    width: "100vw",
    maxWidth: "none",
    filter: "brightness(100%)",
    willChange: "filter",

    [`.${darkTheme} &`]: {
      filter: "brightness(85%)",
    },

    "@bp2": {
      left: 0,
      width: "auto",
      maxWidth: "100%",
      margin: "0 auto",
      boxShadow: "$1",
      borderRadius: "$1",
    },
  },

  pre: {
    position: "relative",
    left: "-$7",
    width: "100vw",

    "& > pre": {
      left: 0,
      width: "100%",
    },

    "@bp2": {
      left: 0,
      width: "100%",
      borderRadius: "$1",

      "& > pre": {
        boxShadow: "$1",
      },
    },
  },

  ul: {
    paddingLeft: "$10",
    paddingBottom: 0,

    "h3 + &": {
      marginTop: "-$5",
    },
  },
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
});

const Figure = memo(function Figure({ src, alt, ...props }: FigureProps) {
  return (
    <Box as="figure" direction="vertical" gap={2} css={{ width: "auto" }}>
      <img src={src} alt={alt} {...props} />
      <TextAux as="figcaption">{alt}</TextAux>
    </Box>
  );
});

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await getPageData(params.id as string);
  const { sectionOne, sectionTwo } = await getPostData(params.id as string);
  const postTime = await getPostTime(sectionOne, sectionTwo);
  const slug = pageData.properties.slug.rich_text[0].plain_text;
  const pageUrl = `${SITE.url}/writing/${slug}`;

  const frontmatter: Frontmatter = {
    title: pageData.properties.page.title[0].plain_text,
    canonical: pageData.properties.canonical.url ?? pageUrl,
    description: pageData.properties.abstract.rich_text[0].plain_text,
    cover: pageData.cover.external.url,
    emoji: pageData.icon.type === "emoji" ? pageData.icon.emoji : "👨‍💻",
    date: pageData.properties.date.date.start,
    time: postTime,
    tags: pageData.properties.tags.multi_select,
    related: pageData.related,
  };

  return {
    props: {
      frontmatter,
      sectionOne,
      sectionTwo,
      pageData,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

const BlogPost: NextPageWithLayout = memo(function BlogPost({
  frontmatter,
  sectionOne,
  sectionTwo,
}: Props) {
  const { asPath, isReady } = useRouter();
  const metaUrl = isReady && asPath ? `${SITE.url}${asPath}` : SITE.url;
  const metaTitle = `${frontmatter.emoji} ${frontmatter.title} | ${SITE.displayName}`;
  const metaContent = `${SITE.url}/api/og?title=${frontmatter.title}&description=${frontmatter.description}&image=${frontmatter.cover}`;
  const keywords = frontmatter.tags.map((tag) => tag.name).join(",");

  const relatedArticles = frontmatter.related.length
    ? getRandomPosts(frontmatter.related, 2)
    : null;

  return (
    <>
      <style jsx global>{`
        code {
          font-family: ${monoLisa.style.fontFamily};
          font-feature-settings: "liga";
        }
      `}</style>

      <Head>
        <title key="title">{metaTitle}</title>

        <link key="canonical" rel="canonical" href={frontmatter.canonical} />
        <meta key="keywords" name="keywords" content={keywords} />
        <meta key="image" name="image" content={metaContent} />
        <meta
          key="description"
          name="description"
          content={frontmatter.description}
        />

        {/* Twitter */}
        <meta key="twitter:title" name="twitter:title" content={metaTitle} />
        <meta key="twitter:image" name="twitter:image" content={metaContent} />
        <meta
          key="twitter:image:width"
          name="twitter:image:width"
          content="1200"
        />
        <meta
          key="twitter:image:height"
          name="twitter:image:height"
          content="630"
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={frontmatter.description}
        />

        {/* OG */}
        <meta key="og:type" name="og:type" content="article" />
        <meta key="og:url" name="og:url" content={metaUrl} />
        <meta key="og:title" name="og:title" content={metaTitle} />
        <meta key="og:image" name="og:image" content={metaContent} />
        <meta key="og:image:width" name="og:image:width" content="1200" />
        <meta key="og:image:height" name="og:image:height" content="630" />
        <meta
          key="og:description"
          name="og:description"
          content={frontmatter.description}
        />
      </Head>

      <Box as="article" direction="vertical" spacingVertical={12}>
        <Box gap={10} container="l" spacingBottom={10} spacingHorizontal={7}>
          <Link
            href="/#writing"
            variant="secondary"
            nextLinkProps={{ shallow: true, scroll: false }}
          >
            <ArrowLeftIcon width={ICON_SIZE.l} height={ICON_SIZE.l} />
            <TextHeadline>Back to articles</TextHeadline>
          </Link>
        </Box>

        <Box direction="vertical" gap={10} container="l">
          <AspectRatio.Root ratio={2 / 1}>
            <StyledHero
              src={frontmatter.cover}
              alt=""
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority
              fill
            />
          </AspectRatio.Root>
        </Box>

        <Box
          direction="vertical"
          gap={10}
          position="relative"
          container="l"
          css={{ top: -22, "@bp2": { top: -32 } }}
        >
          <Box direction="vertical" gap={10} spacingHorizontal={7}>
            <Box direction="vertical" gap={10}>
              <Emoji
                emoji={frontmatter.emoji}
                size={{ "@initial": "m", "@bp2": "l" }}
                css={{ position: "relative", left: "-$2" }}
              />

              <TextTitle2 as="h1" css={{ flexGrow: 1 }}>
                <Balancer>{frontmatter.title}</Balancer>
              </TextTitle2>
            </Box>

            <Box alignItems="flex-end" justifyContent="space-between" gap={4}>
              <Frontmatter>
                <PublishDate date={frontmatter.date} icon />
                <ReadingTime time={frontmatter.time} icon />
                <PostTags
                  tags={frontmatter.tags}
                  alignItems={{ "@initial": "flex-start", "@bp2": "center" }}
                  spacingVertical={{ "@initial": 1, "@bp2": 0 }}
                  icon
                />
              </Frontmatter>

              <ActionButtons css={{ width: "auto" }}>
                <TwitterShareLink
                  url={metaUrl}
                  emoji={frontmatter.emoji}
                  text={frontmatter.title}
                  variant="icon"
                />

                <Box>
                  <ShareButton
                    url={metaUrl}
                    emoji={frontmatter.emoji}
                    text={frontmatter.title}
                    variant="icon"
                  />
                </Box>
              </ActionButtons>
            </Box>

            <Divider />
          </Box>

          <StyledContainer
            direction="vertical"
            container="m"
            gap={8}
            spacingTop={11}
            spacingHorizontal={7}
          >
            <ReactMarkdown
              components={{
                a: MarkdownLink,
                code: DynamicCode as any,
                h1: TextTitle1 as any,
                h2: TextTitle2 as any,
                h3: TextTitle3 as any,
                img: Figure as any,
                table: Table as any,
                thead: THead as any,
                tbody: TBody as any,
                tfoot: TFoot as any,
                tr: Tr as any,
                th: Th as any,
                td: Td as any,
              }}
              remarkPlugins={[remarkMdx, remarkGfm]}
            >
              {sectionOne}
            </ReactMarkdown>
          </StyledContainer>

          <Box
            container="l"
            direction="vertical"
            gap={{
              "@initial": 11,
              "@bp2": 12,
            }}
            spacingHorizontal={7}
            spacingVertical={{
              "@initial": 10,
              "@bp2": 12,
            }}
          >
            <Divider variant="secondary" />

            <Box
              direction="vertical"
              container="m"
              gap={{
                "@initial": 7,
                "@bp2": 10,
              }}
            >
              <Box direction="vertical" alignItems="center">
                <TextTitle2 css={{ color: "$focus" }}>
                  Enjoying the article?
                </TextTitle2>

                <TextAux
                  color="secondary"
                  css={{ display: "flex", "@bp2": { display: "none" } }}
                >
                  Support the content
                </TextAux>
              </Box>

              <Box justifyContent="space-around" alignItems="center" gap={8}>
                <TwitterShareLink
                  url={metaUrl}
                  emoji={frontmatter.emoji}
                  text={frontmatter.title}
                />

                <BuyMeCoffeeLink icon />

                <BlogSubscriptionLink />
              </Box>
            </Box>

            <Divider variant="secondary" />
          </Box>

          <StyledContainer
            direction="vertical"
            container="m"
            gap={8}
            spacingHorizontal={7}
          >
            <ReactMarkdown
              components={{
                a: MarkdownLink,
                code: DynamicCode as any,
                h1: TextTitle1 as any,
                h2: TextTitle2 as any,
                h3: TextTitle3 as any,
                img: Figure as any,
                table: Table as any,
                thead: THead as any,
                tbody: TBody as any,
                tfoot: TFoot as any,
                tr: Tr as any,
                th: Th as any,
                td: Td as any,
              }}
              remarkPlugins={[remarkMdx, remarkGfm]}
            >
              {sectionTwo}
            </ReactMarkdown>
          </StyledContainer>

          {relatedArticles ? (
            <Box
              container="l"
              direction="vertical"
              gap={{
                "@initial": 11,
                "@bp2": 12,
              }}
              spacingHorizontal={7}
              spacingVertical={{
                "@initial": 10,
                "@bp2": 12,
              }}
            >
              <Divider />

              <Box direction="vertical" gap={8} container="m">
                <TextTitle2>Related Articles</TextTitle2>

                <StyledCardContainer display="grid">
                  {relatedArticles.map((post) => {
                    return (
                      <BlogCard
                        key={post.id}
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
                    );
                  })}
                </StyledCardContainer>
              </Box>

              <Divider />
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
});

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BlogPost;
