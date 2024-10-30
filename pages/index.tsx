import { GetStaticProps } from "next";
import { memo, ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { HomepageHero } from "../components/sections/Hero";
import { About } from "../components/sections/About";
import {
  Learning,
  Props as LearningProps,
} from "../components/sections/Learning";
import { Writing, Props as WritingProps } from "../components/sections/Writing";
import { getPosts } from "../lib/notion";
import { getYoutubeData } from "../lib/youtube";
import { ONE_MINUTE_IN_SECONDS } from "../util/date";
import { getTags, sortPosts } from "../util/notion";
import { formatChannelInfo, formatVideo, formatVideos } from "../util/youtube";
import { NextPageWithLayout } from "./_app";

type Props = {
  writing: WritingProps;
  learning: LearningProps;
};

export const getStaticProps: GetStaticProps = async () => {
  // Writing
  const posts = await getPosts();
  const sortedPosts = sortPosts(posts);
  const postTags = getTags(posts);

  // Learning
  const { channelUploads, channelSubscriptions, channelInfo } =
    await getYoutubeData();

  const [featured, ...uploads] = formatVideos(channelUploads.data.items);

  const subscriptions = formatVideos(channelSubscriptions);

  const info = formatChannelInfo(channelInfo);

  return {
    props: {
      writing: {
        posts: sortedPosts,
        tags: postTags,
      },
      learning: {
        featured,
        uploads,
        subscriptions,
        info,
      },
    },
    revalidate: ONE_MINUTE_IN_SECONDS,
  };
};

const Home: NextPageWithLayout = memo(function Home({
  writing,
  learning,
}: Props) {
  return (
    <>
      <Box direction="vertical">
        <HomepageHero />

        <About />

        <Writing {...writing} />

        <Learning {...learning} />
      </Box>
    </>
  );
});

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
