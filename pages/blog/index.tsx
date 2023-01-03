import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Preview } from "../../components/Blog";
import { Box, Layout } from "../../components/Layout";
import { TagToggle } from "../../components/Tags";
import { TextTitle1 } from "../../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../../constants/date";
import { getTags } from "../../helpers/notion";
import { filterPosts, sortPosts } from "../../helpers/posts";
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
        posts: sortPosts(posts.personal),
        tags: getTags(posts.personal),
      },
      professional: {
        posts: sortPosts(posts.professional),
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

  const { posts, tags } = tab === "personal" ? personal : professional;

  const filteredPosts = activeTagId ? filterPosts(posts, activeTagId) : posts;

  function handleTagChange(tagId: string) {
    setActiveTagId(tagId);
  }

  return (
    <Layout>
      <Box
        direction="vertical"
        gap={10}
        alignItems="center"
        css={{ maxWidth: 720, margin: "0 auto" }}
      >
        <TextTitle1>BLOG</TextTitle1>

        <nav aria-label="Blog categories">
          <Box direction="horizontal" as="ul" role="list" gap={5}>
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
          </Box>
        </nav>

        <Box direction="horizontal">
          <TagToggle
            tags={tags}
            value={activeTagId}
            onChange={handleTagChange}
          />
        </Box>

        <Container>
          {filteredPosts.map((post) => (
            <Preview key={`${post.properties.slug}`} post={post} />
          ))}
        </Container>
      </Box>
    </Layout>
  );
}

export default Blog;
