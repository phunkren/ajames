import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Preview } from "../../components/Blog";
import { Layout } from "../../components/Layout";
import { getDatabase } from "../../lib/notion";
import { BlogPost } from "../../types/notion";

type Props = {
  professionalPosts: BlogPost[];
  personalPosts: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const personalPosts = await getDatabase(
    process.env.NOTION_PERSONAL_DATABASE_ID
  );

  const professionalPosts = await getDatabase(
    process.env.NOTION_PROFESSIONAL_DATABASE_ID
  );

  return {
    props: {
      personalPosts,
      professionalPosts,
    },
  };
};

function Blog(props: Props) {
  const {
    query: { tab },
  } = useRouter();

  const { personalPosts, professionalPosts } = props;

  const posts = tab === "personal" ? personalPosts : professionalPosts;

  return (
    <Layout>
      <h1>BLOG</h1>

      <ul>
        <li>
          <Link href={{ pathname: "/blog", query: { tab: "professional" } }}>
            Professional
          </Link>
        </li>

        <li>
          <Link href={{ pathname: "/blog", query: { tab: "personal" } }}>
            Personal
          </Link>
        </li>
      </ul>

      <main>
        <Container>
          {posts.map((post, i) => (
            <Preview key={i} post={post} />
          ))}
        </Container>
      </main>
    </Layout>
  );
}

export default Blog;
