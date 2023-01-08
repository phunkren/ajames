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
import { formatLongDate, ONE_HOUR_IN_SECONDS } from "../../util/date";
import { BlogLayout, Box } from "../../components/Layout";
import {
  BlogSubscribeLink,
  Link,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import { Emoji, TextTitle2 } from "../../components/Text";
import { Code } from "../../components/Code";
import { Divider } from "../../components/Divider";
import {
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { H2_STYLES } from "../../styles/text";
import { PERSONAL, SITE, SOCIAL } from "../../util/data";
import { ShareButton } from "../../components/Button";
import Head from "next/head";

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
    date: formatLongDate(new Date(pageData.properties.date.date.start)),
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
      >
        <Box direction="vertical">
          <Box direction="vertical">
            <Emoji emoji={frontmatter.emoji} css={{ ...H2_STYLES }} />

            <Box
              justifyContent="space-between"
              alignItems="flex-start"
              spacingTop={{ "@initial": 3, "@bp2": 0 }}
            >
              <TextTitle2>
                <Balancer>{frontmatter.title}</Balancer>
              </TextTitle2>

              <BlogSubscribeLink
                variant="button"
                css={{
                  display: "none",
                  "@bp2": { display: "flex", position: "relative", top: 18 },
                }}
              />
            </Box>
          </Box>

          <Box gap={4} spacingTop={7} alignItems="center">
            <Box
              id="frontmatter"
              as="ul"
              role="list"
              direction="vertical"
              gap={5}
            >
              <Box as="ul" role="list" direction="vertical" gap={4}>
                <li>
                  <PostTags tags={frontmatter.tags} icon />
                </li>
                <PublishDate as="li" date={frontmatter.date} icon />
                <ReadingTime as="li" time={frontmatter.time} icon />
              </Box>
            </Box>

            <Box
              gap={4}
              direction="vertical"
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
          gap={7}
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

          <Box
            justifyContent="space-between"
            alignItems="center"
            spacingHorizontal={7}
            spacingBottom={10}
            gap={4}
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
    </BlogLayout>
  );
}
