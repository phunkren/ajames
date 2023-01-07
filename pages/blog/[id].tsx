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
  Link,
  MarkdownLink,
  TwitterShareLink,
} from "../../components/Link";
import {
  Emoji,
  TextHeadline,
  TextTitle2,
  TextTitle3,
} from "../../components/Text";
import { Code } from "../../components/Code";
import { Divider } from "../../components/Divider";
import {
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { H2_STYLES } from "../../styles/text";
import { SITE, SOCIAL } from "../../util/data";
import { ShareButton } from "../../components/Button";
import { RocketIcon, Share2Icon, TwitterLogoIcon } from "@radix-ui/react-icons";

type Frontmatter = {
  title: string;
  cover: string;
  emoji: string;
  date: string;
  time: number;
  tags: Tag[];
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

  const frontmatter: Frontmatter = {
    title: pageData.properties.page.title[0].plain_text,
    cover: pageData.cover.external.url,
    emoji: pageData.icon.type === "emoji" ? pageData.icon.emoji : "👨‍💻",
    date: new Date(pageData.properties.date.date.start).toISOString(),
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
    <BlogLayout hero={frontmatter.cover}>
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
              spacingTop={{ "@initial": 2, "@bp2": 0 }}
            >
              <TextTitle2>
                <Balancer>{frontmatter.title}</Balancer>
              </TextTitle2>

              <BlogSubscribeLink
                css={{
                  display: "none",
                  "@bp2": { display: "flex", position: "relative", top: 18 },
                }}
              />
            </Box>
          </Box>

          <Box gap={4} spacingTop={7}>
            <Box
              id="frontmatter"
              as="ul"
              role="list"
              direction="vertical"
              gap={4}
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
              />

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

        <Box spacingVertical={10}>
          <Divider />
        </Box>

        <Box
          direction="vertical"
          gap={7}
          css={{ maxWidth: 900, margin: "0 auto", textAlign: "justify" }}
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

          <Box direction="vertical" gap={7} spacingBottom={10}>
            <TextTitle3 css={{ textAlign: "center" }}>
              Enjoy the article?
            </TextTitle3>

            <Box
              direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
              justifyContent="space-between"
              alignItems="center"
              spacingHorizontal={7}
              gap={4}
            >
              <Link href="/" variant="secondary">
                <Box alignItems="center" gap={4} spacingVertical={2}>
                  <TwitterLogoIcon width={18} height={18} aria-hidden />
                  <TextHeadline>Tweet</TextHeadline>
                </Box>
              </Link>
              <Link href="/" variant="secondary">
                <Box alignItems="center" gap={4} spacingVertical={2}>
                  <Share2Icon width={18} height={18} aria-hidden />{" "}
                  <TextHeadline>Share</TextHeadline>
                </Box>
              </Link>
              <Link href="/" variant="secondary">
                <Box alignItems="center" gap={4} spacingVertical={2}>
                  <RocketIcon width={18} height={18} aria-hidden />{" "}
                  <TextHeadline>Subscribe</TextHeadline>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </BlogLayout>
  );
}
