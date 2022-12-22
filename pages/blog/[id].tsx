import { Layout } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

type Props = {
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
  const postData = getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function BlogPost({ postData }: Props) {
  return (
    <Layout>
      <div>{JSON.stringify(postData)}</div>
    </Layout>
  );
}
