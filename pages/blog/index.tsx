import { GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, CardContainer } from "../../components/Card";
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

  const { pathname, push, query } = useRouter();

  const { personal, professional } = props;

  const { posts, tags } = query.tab === "personal" ? personal : professional;

  const filteredPosts = query.tag ? filterPosts(posts, query.tag) : posts;

  function handleTagChange(tagName: string) {
    push({
      pathname,
      query: {
        ...query,
        tag: tagName,
      },
    });
  }

  return (
    <Layout>
      <Box direction="vertical" gap={10} alignItems="center">
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

        <TagToggle tags={tags} value={activeTagId} onChange={handleTagChange} />

        <CardContainer>
          {filteredPosts.map((post) => (
            <Card
              url={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
              image={post.cover.external.url}
              emoji={post.icon.type === "emoji" ? post.icon.emoji : "👨‍💻"}
              title={post.properties.page.title[0].plain_text}
              publishDate={post.properties.date.date.start}
              readingTime={8}
              tags={post.properties.tags.multi_select}
            />
          ))}
        </CardContainer>
      </Box>
    </Layout>
  );
}

export default Blog;
