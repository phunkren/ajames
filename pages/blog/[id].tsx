import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Box, Layout } from "../../components/Layout";
import { TextAux, TextTitle1 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { getPageData } from "../../lib/notion";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { Tag } from "../../types/notion";

type Frontmatter = {
  title: string;
  image: string;
  date: string;
  tags?: Tag[];
};

type Props = {
  frontmatter: Frontmatter;
  postData: Record<string, unknown>;
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
    image: pageData.cover?.file.url ?? "",
    date: pageData.properties.date.date.start,
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
    <Layout>
      <Box direction="vertical" id="frontmatter" alignItems="center">
        <Image
          src={frontmatter.image}
          alt="cover image"
          width={100}
          height={100}
        />

        <TextTitle1>
          <Balancer>{frontmatter.title}</Balancer>
        </TextTitle1>

        <TextAux>{frontmatter.date}</TextAux>

        {frontmatter.tags?.length > 0 ? (
          <Box direction="horizontal">
            {frontmatter.tags.map((tag) => (
              <TextAux key={tag.id}>{tag.name}</TextAux>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box
        direction="vertical"
        id="content"
        as="article"
        css={{ maxWidth: 720, margin: "0 auto" }}
        gap={{ "@initial": 3, "@bp2": 5 }}
        dangerouslySetInnerHTML={{ __html: postData }}
      />
    </Layout>
  );
}
