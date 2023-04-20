import { memo, ReactElement } from "react";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Tag } from "../../util/notion";
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
import { BlogSeo } from "../../components/SEO";
import dynamic from "next/dynamic";
import { ONE_HOUR_IN_SECONDS } from "../../util/date";
import { GetStaticPaths, GetStaticProps } from "next";
import { Table, TBody, Td, TFoot, Th, THead, Tr } from "../../components/Table";
import Image from "next/image";
import { BLUR_DATA_URL, ICON_SIZE } from "../../util/images";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export type Frontmatter = {
  title: string;
  description: string;
  cover: string;
  emoji: string;
  date: string;
  time: number;
  tags: Tag[];
  canonical?: string;
};

type Props = {
  frontmatter: Frontmatter;
  postData: string;
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
  },

  h2: {
    ...H2_STYLES,
    marginTop: "$8",
    marginBottom: "$4",
  },

  h3: {
    ...H3_STYLES,
    marginTop: "$4",
    marginBottom: "$2",
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
  const postData = await getPostData(params.id as string);
  const postTime = await getPostTime(postData);

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
  };

  return {
    props: {
      frontmatter,
      postData,
      pageData,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

const BlogPost: NextPageWithLayout = memo(function BlogPost({
  frontmatter,
  postData,
}: Props) {
  const { asPath, isReady } = useRouter();
  const metaUrl = isReady && asPath ? `${SITE.url}${asPath}` : SITE.url;

  return (
    <>
      <style jsx global>{`
        code {
          font-family: ${monoLisa.style.fontFamily};
          font-feature-settings: "liga";
        }
      `}</style>

      <BlogSeo frontmatter={frontmatter} />

      <Box as="article" direction="vertical" spacingVertical={12}>
        <Box gap={10} container="l" spacingBottom={4} spacingHorizontal={7}>
          <Link
            href="/#writing"
            variant="secondary"
            nextLinkProps={{ shallow: true, scroll: false }}
          >
            <ArrowLeftIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
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

            <Box alignItems="flex-end" justifyContent="space-between">
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
            spacingVertical={11}
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
              {postData}
            </ReactMarkdown>

            <Box direction="vertical" gap={10} spacingVertical={12}>
              <Divider />

              <Box
                direction="vertical"
                gap={{
                  "@initial": 6,
                  "@bp2": 10,
                }}
              >
                <TextTitle3 textAlign="center" css={{ color: "$focus" }}>
                  Enjoy the article?
                </TextTitle3>

                <Box
                  direction={{
                    "@initial": "vertical",
                    "@bp2": "horizontal",
                  }}
                  justifyContent="space-around"
                  alignItems="center"
                  gap={8}
                >
                  <TwitterShareLink
                    url={metaUrl}
                    emoji={frontmatter.emoji}
                    text={frontmatter.title}
                  />

                  <BuyMeCoffeeLink icon />

                  <BlogSubscriptionLink />
                </Box>
              </Box>

              <Divider />
            </Box>
          </StyledContainer>
        </Box>
      </Box>
    </>
  );
});

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BlogPost;
