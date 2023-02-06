import { useRouter } from "next/router";
import remarkMdx from "remark-mdx";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { Tag } from "../../types/notion";
import {
  getAllPostIds,
  getPageData,
  getPostData,
  getPostTime,
} from "../../lib/notion";
import { ActionButtons, HeroLayout, Layout } from "../../components/Layout";
import {
  BlogSubscriptionLink,
  Link,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import {
  Emoji,
  MarkdownTitle,
  TextHeadline,
  TextTitle2,
  TextTitle3,
} from "../../components/Text";
import { Code } from "../../components/Code";
import { Divider } from "../../components/Divider";
import {
  Frontmatter,
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { SITE } from "../../util/data";
import { ScrollToTopButton, ShareButton } from "../../components/Button";
import { styled } from "../../stitches.config";
import { H1_STYLES, H2_STYLES, H3_STYLES, P_STYLES } from "../../styles/text";
import { Box } from "../../components/Box";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { BlogSeo } from "../../components/SEO";
import { ONE_HOUR_IN_SECONDS } from "../../util/date";

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

const StyledContainer = styled(Box, {
  h1: H1_STYLES,
  h2: H2_STYLES,
  h3: H3_STYLES,
  p: P_STYLES,

  img: {
    margin: "0 auto",
  },

  "img, pre": {
    boxShadow: "$1",
    borderRadius: 4,
  },

  ul: {
    paddingLeft: "$10",
  },

  "@bp3": {
    p: {
      fontSize: 24,
    },
  },
});

// These magic numbers are calculated based on the font size of the TextTitle1 component
// The computed value is (fontSize * lineHeight) / 2.
const StyledContent = styled(Box, {
  position: "relative",
  top: -16,

  "@bp2": {
    top: -32,
  },
});

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const pageData = await getPageData(params.id);
  const postData = await getPostData(params.id);
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
    // revalidate: ONE_HOUR_IN_SECONDS,
  };
}

const BlogPost: NextPageWithLayout = ({ frontmatter, postData }: Props) => {
  const { asPath } = useRouter();
  const metaUrl = asPath ? `${SITE.url}${asPath}` : SITE.url;

  return (
    <>
      <BlogSeo frontmatter={frontmatter} />

      <Box direction="vertical">
        <Box direction="vertical">
          <HeroLayout src={frontmatter.cover} />

          <StyledContent as="main" direction="vertical">
            <Box
              as="article"
              direction="vertical"
              spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
              gap={10}
            >
              <Box direction="vertical">
                <Box direction="vertical">
                  <Emoji
                    emoji={frontmatter.emoji}
                    size={{ "@initial": "s", "@bp2": "l" }}
                    css={{
                      position: "relative",
                      right: "$1",
                      alignSelf: "flex-start",
                      "@bp2": {
                        right: "$2",
                      },
                    }}
                  />

                  <Box
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacingTop={{ "@initial": 5, "@bp2": 10 }}
                    gap={6}
                    css={{ marginTop: 3 }}
                  >
                    <TextTitle2 css={{ spacingBottom: "$4" }}>
                      <Balancer>{frontmatter.title}</Balancer>
                    </TextTitle2>

                    <BlogSubscriptionLink
                      type="button"
                      css={{
                        display: "none",
                        transform: "translateY(50%)",
                        "@bp3": { display: "flex" },
                      }}
                    />
                  </Box>
                </Box>

                <Box gap={10} alignItems="flex-end">
                  <Frontmatter spacingTop={6}>
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
              </Box>

              <Box spacingVertical={10}>
                <Divider />
              </Box>

              <StyledContainer
                direction="vertical"
                container="m"
                gap={10}
                css={{
                  textAlign: "justify",
                  hyphens: "auto",
                }}
              >
                <ReactMarkdown
                  components={{
                    a: MarkdownLink,
                    code: Code,
                    h1: TextTitle2 as any,
                    h2: MarkdownTitle as any,
                    h3: TextHeadline as any,
                  }}
                  remarkPlugins={[remarkMdx]}
                >
                  {postData}
                </ReactMarkdown>

                <Box direction="vertical" spacingTop={10}>
                  <ScrollToTopButton css={{ alignSelf: "center" }} />
                </Box>

                <Box spacingVertical={10}>
                  <Divider />
                </Box>

                <Box direction="vertical" gap={10}>
                  <TextTitle3 textAlign="center" color="secondary">
                    Enjoying the content?
                  </TextTitle3>

                  <Box
                    justifyContent="space-around"
                    alignItems="center"
                    gap={7}
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
              </StyledContainer>
            </Box>
          </StyledContent>
        </Box>
      </Box>
    </>
  );
};

BlogPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BlogPost;
