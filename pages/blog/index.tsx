import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Preview } from "../../components/Blog";
import { HStack, Layout, VStack } from "../../components/Layout";
import { Tags, TagToggle } from "../../components/Tags";
import { TextAux, TextTitle1 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { getTags } from "../../helpers/notion";
import { filterPosts } from "../../helpers/posts";
import { getPosts } from "../../lib/notion";
import { BlogPost, Tag } from "../../types/notion";

type Props = {
  professional: {
    posts: BlogPost[];
    tags: Tag[];
  };
  personal: {
    posts: BlogPost[];
    tags: Tag[];
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: {
      personal: {
        posts: posts.personal,
        tags: getTags(posts.personal),
      },
      professional: {
        posts: posts.professional,
        tags: getTags(posts.professional),
      },
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

function Blog(props: Props) {
  const [activeTagId, setActiveTagId] = useState<string>();

  const {
    query: { tab },
  } = useRouter();

  const { personal, professional } = props;

  const posts = tab === "personal" ? personal.posts : professional.posts;

  const filteredPosts = activeTagId ? filterPosts(posts, activeTagId) : posts;

  const tags = tab === "personal" ? personal.tags : professional.tags;

  function handleTagChange(tagId: string) {
    setActiveTagId(tagId);
  }

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
                onClick={() => setActiveTagId(undefined)}
              >
                Professional
              </Link>
            </li>

            <li>
              <Link
                href={{ pathname: "/blog", query: { tab: "personal" } }}
                onClick={() => setActiveTagId(undefined)}
              >
                Personal
              </Link>
            </li>
          </HStack>
        </nav>

        <HStack>
          <TagToggle
            tags={tags}
            value={activeTagId}
            onChange={handleTagChange}
          />
        </HStack>

        <Container>
          {filteredPosts.map((post) => (
            <Preview key={`${post.properties.slug}`} post={post} />
          ))}
        </Container>
      </VStack>
    </Layout>
  );
}

export default Blog;
