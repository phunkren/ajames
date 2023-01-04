import remarkMdx from "remark-mdx";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { Tag } from "../../types/notion";
import { getPageData } from "../../lib/notion";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { BlogLayout, Box, Layout } from "../../components/Layout";
import { MarkdownLink } from "../../components/Link";
import { TextAux, TextTitle1 } from "../../components/Text";
import { Code } from "../../components/Code";
import { CalendarIcon, ClockIcon, ListBulletIcon } from "@radix-ui/react-icons";
import { Divider } from "../../components/Divider";

type Frontmatter = {
  title: string;
  cover: string;
  emoji: string;
  date: string;
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

  const frontmatter: Frontmatter = {
    title: pageData.properties.page.title[0].plain_text,
    cover: pageData.cover.external.url,
    emoji: pageData.icon.type === "emoji" ? pageData.icon.emoji : "👨‍💻",
    date: new Date(pageData.properties.date.date.start).toISOString(),
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
      <Box as="article" direction="vertical">
        <Box spacingHorizontal={{ "@bp3": 7 }}>
          <TextTitle1>
            <span aria-hidden style={{ display: "block" }}>
              {frontmatter.emoji}
            </span>

            <Balancer>{frontmatter.title}</Balancer>
          </TextTitle1>
        </Box>

        <Box
          direction="vertical"
          css={{ maxWidth: 720, margin: "0 auto" }}
          gap={{ "@initial": 4, "@bp2": 7 }}
        >
          <Box
            id="frontmatter"
            as="ul"
            direction="vertical"
            gap={4}
            spacingTop={7}
            css={{ maxWidth: 720, margin: "0 auto" }}
          >
            <Box as="li" alignItems="center" gap={4}>
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
              <TextAux>10 minutes</TextAux>
            </Box>
          </Box>

          <Box spacingVertical={7}>
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
