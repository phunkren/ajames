import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Preview } from "../../components/Blog";
import { HStack, Layout, VStack } from "../../components/Layout";
import { TextTitle1 } from "../../components/Text";
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
      <VStack
        gap={10}
        alignItems="center"
        css={{ maxWidth: 720, margin: "0 auto" }}
      >
        <TextTitle1>BLOG</TextTitle1>

        <nav aria-label="Blog categories">
          <HStack as="ul" role="list" gap={5}>
            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "professional" } }}
              >
                Professional
              </Link>
            </li>

            <li>
              <Link href={{ pathname: "/blog", query: { tab: "personal" } }}>
                Personal
              </Link>
            </li>
          </HStack>
        </nav>

        <Container>
          {posts.map((post, i) => (
            <Preview key={i} post={post} />
          ))}
        </Container>
      </VStack>
    </Layout>
  );
}

export default Blog;
