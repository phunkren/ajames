import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { HStack, Layout, VStack } from "../../components/Layout";
import { TextAux, TextTitle1 } from "../../components/Text";
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
  };
}

export default function BlogPost({ frontmatter, postData }: Props) {
  return (
    <Layout>
      <VStack id="frontmatter" alignItems="center">
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
          <HStack>
            {frontmatter.tags.map((tag) => (
              <TextAux key={tag.id}>{tag.name}</TextAux>
            ))}
          </HStack>
        ) : null}
      </VStack>

      <VStack
        id="content"
        as="article"
        css={{ maxWidth: 720, margin: "0 auto" }}
        gap={{ "@initial": 3, "@bp2": 5 }}
        dangerouslySetInnerHTML={{ __html: postData }}
      />
    </Layout>
  );
}
