import remarkMdx from "remark-mdx";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { Tag } from "../../types/notion";
import { getPageData } from "../../lib/notion";
import { getAllPostIds, getPostData, getPostTime } from "../../lib/posts";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { BlogLayout, Box } from "../../components/Layout";
import { MarkdownLink } from "../../components/Link";
import { TextAux, TextTitle1 } from "../../components/Text";
import { Code } from "../../components/Code";
import { CalendarIcon, ClockIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Divider } from "../../components/Divider";
import { formatReadingTime } from "../../helpers/posts";

type Frontmatter = {
  title: string;
  cover: string;
  emoji: string;
  date: string;
  time: string;
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
    time: formatReadingTime(postTime),
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
          <TextTitle1 as="h1">
            <Box
              position="relative"
              spacingBottom={1}
              css={{ right: "$2" }}
              aria-hidden
            >
              {frontmatter.emoji}
            </Box>

            <Balancer>{frontmatter.title}</Balancer>
          </TextTitle1>

          <Box
            id="frontmatter"
            as="ul"
            direction="vertical"
            gap={4}
            spacingTop={7}
          >
            <Box as="li" alignItems="center" gap={7}>
              <ListBulletIcon width={28} height={28} />
              {frontmatter.tags.map((tag) => (
                <TextAux key={tag.id}>{tag.name}</TextAux>
              ))}
            </Box>

            <Box as="li" alignItems="center" gap={4}>
              <CalendarIcon width={28} height={28} />
              <TextAux>{frontmatter.date}</TextAux>
            </Box>

            <Box as="li" alignItems="center" gap={4}>
              <ClockIcon width={28} height={28} />
              {/* TODO: Add calculated reading time */}
              <TextAux>{frontmatter.time}</TextAux>
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
