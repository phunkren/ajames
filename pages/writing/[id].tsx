import { memo, ReactElement } from "react";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
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
import {
  ActionButtons,
  HeroLayout,
  Layout,
  LoadingLayout,
} from "../../components/Layout";
import {
  BlogSubscriptionLink,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import {
  Emoji,
  MarkdownH2,
  MarkdownH3,
  TextAux,
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

  h1: H1_STYLES,
  h2: H2_STYLES,
  h3: H3_STYLES,
  p: {
    ...P_BLOG_STYLES,
    color: "$foregroundMuted",
  },

  "a, code": {
    color: "$foreground",
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
    width: "fit-content",
    margin: "0 auto",
  },

  img: {
    position: "relative",
    left: "-$6",
    width: "100vw",
    maxWidth: "none",

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
    left: "-$6",
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

const BlogPost: NextPageWithLayout = ({ frontmatter, postData }: Props) => {
  const { asPath } = useRouter();
  const metaUrl = asPath ? `${SITE.url}${asPath}` : SITE.url;

  return (
    <>
      <BlogSeo frontmatter={frontmatter} />

      <Box as="article" direction="vertical" spacingVertical={12}>
        <Box direction="vertical" gap={10} container="l">
          <AspectRatio.Root ratio={2 / 1}>
            <StyledHero
              src={frontmatter.cover}
              alt=""
              priority
              fill
              quality={100}
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
                <PostTags tags={frontmatter.tags} icon />
                <PublishDate date={frontmatter.date} icon />
                <ReadingTime time={frontmatter.time} icon />
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
            spacingHorizontal={7}
          >
            <ReactMarkdown
              components={{
                a: MarkdownLink,
                code: DynamicCode as any,
                h1: TextTitle2 as any,
                h2: MarkdownH2 as any,
                h3: MarkdownH3 as any,
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
                <TextTitle3 textAlign="center" color="secondary">
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

                  <BlogSubscriptionLink />

                  <Box>
                    <ShareButton
                      url={metaUrl}
                      emoji={frontmatter.emoji}
                      text={frontmatter.title}
                    />
                  </Box>
                </Box>
              </Box>

              <Divider />
            </Box>
          </StyledContainer>
        </Box>
      </Box>
    </>
  );
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BlogPost;
