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
import { ONE_HOUR_IN_SECONDS } from "../../util/date";
import { BlogLayout, Box } from "../../components/Layout";
import {
  BlogSubscribeLink,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import { Emoji, TextTitle2, TextTitle3 } from "../../components/Text";
import { Code } from "../../components/Code";
import { Divider } from "../../components/Divider";
import {
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { SITE } from "../../util/data";
import { ShareButton } from "../../components/Button";
import { H2_STYLES } from "../../styles/text";

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
                zIndex: 1,
                position: "relative",
                right: "$2",
                alignSelf: "flex-start",
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

              <BlogSubscribeLink
                type="button"
                css={{
                  display: "none",
                  transform: "translateY(50%)",
                  "@bp3": { display: "flex" },
                }}
              />
            </Box>
          </Box>

          <Box gap={10}>
            <Box
              id="frontmatter"
              as="ul"
              role="list"
              direction="vertical"
              spacingTop={6}
              gap={6}
            >
              <li>
                <PostTags tags={frontmatter.tags} icon />
              </li>
              <li>
                <PublishDate date={frontmatter.date} icon />
              </li>
              <li>
                <ReadingTime time={frontmatter.time} icon />
              </li>
            </Box>

            <Box
              gap={4}
              direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              css={{ width: "auto" }}
            >
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
            </Box>
          </Box>
        </Box>

        <Box spacingVertical={10}>
          <Divider />
        </Box>

        <Box
          direction="vertical"
          gap={10}
          css={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "justify",
          }}
        >
          <ReactMarkdown
            children={postData}
            components={{
              a: MarkdownLink,
              code: Code,
            }}
            remarkPlugins={[remarkMdx]}
          />

          <Box spacingVertical={10}>
            <Divider />
          </Box>

          <Box direction="vertical" gap={6}>
            <TextTitle3
              css={{ textAlign: "center", color: "$foregroundMuted" }}
            >
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

              <BlogSubscribeLink />

              <Box>
                <ShareButton
                  url={shareUrl}
                  emoji={frontmatter.emoji}
                  text={frontmatter.title}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </BlogLayout>
  );
}
