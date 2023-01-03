import Image from "next/image";
import remarkMdx from "remark-mdx";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";
import { Tag } from "../../types/notion";
import { getPageData } from "../../lib/notion";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { Box, Layout } from "../../components/Layout";
import { MarkdownLink } from "../../components/Link";
import { TextAux, TextTitle1 } from "../../components/Text";
import { Code } from "../../components/Code";

type Frontmatter = {
  title: string;
  cover: string;
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

  const frontmatter = {
    title: pageData.properties.page.title[0].plain_text,
    cover: pageData.cover.external.url,
    date: new Date(pageData.properties.date.date.start).toISOString(),
    tags: pageData.properties.tags.multi_select,
  };

  return {
    props: {
      frontmatter,
      postData,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
}

export default function BlogPost({ frontmatter, postData }: Props) {
  return (
    <Layout>
      <Box direction="vertical" alignItems="center">
        <Image src={frontmatter.cover} alt="" width={100} height={100} />

        <TextTitle1>
          <Balancer>{frontmatter.title}</Balancer>
        </TextTitle1>

        <TextAux>{frontmatter.date}</TextAux>

        <Box direction="horizontal">
          {frontmatter.tags.map((tag) => (
            <TextAux key={tag.id}>{tag.name}</TextAux>
          ))}
        </Box>
      </Box>

      <Box
        direction="vertical"
        as="article"
        css={{ maxWidth: 720, margin: "0 auto" }}
        gap={{ "@initial": 3, "@bp2": 5 }}
      >
        <ReactMarkdown
          children={postData}
          components={{
            a: MarkdownLink,
            code: Code,
          }}
          remarkPlugins={[remarkMdx]}
        />
      </Box>
    </Layout>
  );
}
