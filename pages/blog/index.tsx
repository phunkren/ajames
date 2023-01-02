import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Preview } from "../../components/Blog";
import { HStack, Layout, VStack } from "../../components/Layout";
import { TextTitle1 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { getPosts } from "../../lib/notion";
import { BlogPost } from "../../types/notion";

type Props = {
  professional: BlogPost[];
  personal: BlogPost[];
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      ...posts,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

function Blog(props: Props) {
  const {
    query: { tab },
  } = useRouter();

  const { personal, professional } = props;

  const posts = tab === "personal" ? personal : professional;

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
          {posts.map((post) => (
            <Preview key={`${post.properties.slug}`} post={post} />
          ))}
        </Container>
      </VStack>
    </Layout>
  );
}

export default Blog;
