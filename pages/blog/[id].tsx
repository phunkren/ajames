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
import { ActionButtons, BlogLayout, Box } from "../../components/Layout";
import {
  BlogSubscriptionLink,
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
import { ShareButton } from "../../components/Button";
import { styled } from "../../stitches.config";
import { H1_STYLES, H2_STYLES, H3_STYLES, P_STYLES } from "../../styles/text";

type Frontmatter = {
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

  "img, pre code": {
    boxShadow: "$1",
  },

  ul: {
    paddingLeft: "$10",
  },
});

export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pageData = await getPageData(params.id);
  const postData = await getPostData(params.id);
  const postTime = await getPostTime(postData);

  const slug = pageData.properties.slug.rich_text[0].plain_text;
  const pageUrl = `${SITE.url}/blog/${slug}`;

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
  };
}

export default function BlogPost({ frontmatter, postData }: Props) {
  const router = useRouter();
  const shareUrl = `${SITE.url}${router.asPath}`;

  return (
    <BlogLayout frontmatter={frontmatter}>
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
              size={{ "@bp2": "l" }}
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
              spacingTop={4}
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
                url={shareUrl}
                emoji={frontmatter.emoji}
                text={frontmatter.title}
                variant="icon"
              />

              <Box>
                <ShareButton
                  url={shareUrl}
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

          <Box spacingVertical={10}>
            <Divider />
          </Box>

          <Box direction="vertical" gap={6}>
            <TextTitle3 textAlign="center" color="secondary">
              Enjoying the content?
            </TextTitle3>

            <Box
              justifyContent="space-around"
              alignItems="center"
              spacingBottom={10}
              gap={7}
            >
              <TwitterShareLink
                url={shareUrl}
                emoji={frontmatter.emoji}
                text={frontmatter.title}
              />

              <BlogSubscriptionLink />

              <Box>
                <ShareButton
                  url={shareUrl}
                  emoji={frontmatter.emoji}
                  text={frontmatter.title}
                />
              </Box>
            </Box>
          </Box>
        </StyledContainer>
      </Box>
    </BlogLayout>
  );
}
