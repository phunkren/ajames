import remarkMdx from "remark-mdx";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { Tag } from "../../types/notion";
import { getPageData } from "../../lib/notion";
import { getAllPostIds, getPostData, getPostTime } from "../../lib/posts";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { BlogLayout, Box } from "../../components/Layout";
import { MarkdownLink } from "../../components/Link";
import { Emoji, TextTitle1, TextTitle2 } from "../../components/Text";
import { Code } from "../../components/Code";
import { Divider } from "../../components/Divider";
import {
  PostTags,
  PublishDate,
  ReadingTime,
} from "../../components/Frontmatter";
import { H1_STYLES } from "../../styles/text";

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
  return (
    <BlogLayout hero={frontmatter.cover}>
      <Box
        as="article"
        direction="vertical"
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        gap={{ "@initial": 4, "@bp2": 7 }}
      >
        <Box direction="vertical">
          <Box
            direction="vertical"
            position="relative"
            spacingBottom={1}
            css={{ right: "$2" }}
            aria-hidden
          >
            <Emoji
              emoji={frontmatter.emoji}
              css={{ position: "relative", right: "$2", ...H1_STYLES }}
            />

            <TextTitle2>
              <Balancer>{frontmatter.title}</Balancer>
            </TextTitle2>
          </Box>

          <Box
            id="frontmatter"
            as="ul"
            role="list"
            direction="vertical"
            gap={4}
          >
            <Box
              as="ul"
              role="list"
              direction="vertical"
              gap={4}
              spacingTop={7}
            >
              <li>
                <PostTags tags={frontmatter.tags} icon />
              </li>
              <PublishDate as="li" date={frontmatter.date} icon />
              <ReadingTime as="li" time={frontmatter.time} icon />
            </Box>
          </Box>
        </Box>

        <Box direction="vertical" gap={7}>
          <Box spacingVertical={10}>
            <Divider />
          </Box>

          <ReactMarkdown
            children={postData}
            components={{
              a: MarkdownLink,
              code: Code,
            }}
            remarkPlugins={[remarkMdx]}
          />
        </Box>
      </Box>
    </BlogLayout>
  );
}
