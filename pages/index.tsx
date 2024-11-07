import { GetStaticProps } from "next";
import { memo, ReactElement } from "react";
import { Box } from "../components/Box";
import { Layout } from "../components/Layout";
import { HomepageHero } from "../components/sections/Hero";
import {
  Learning,
  Props as LearningProps,
} from "../components/sections/Learning";
import { Writing, Props as WritingProps } from "../components/sections/Writing";
import { Social, Props as SocialProps } from "../components/sections/Social";
import { getPosts } from "../lib/notion";
import { getYoutubeData } from "../lib/youtube";
import { ONE_MINUTE_IN_SECONDS } from "../util/date";
import { getTags, sortPosts } from "../util/notion";
import { formatChannelInfo, formatVideos } from "../util/youtube";
import { NextPageWithLayout } from "./_app";
import { getAtProtoData } from "../lib/atproto";
import {
  formatAtprotoFeed,
  formatAtprotoPinnedPost,
  formatAtprotoProfile,
} from "../util/atproto";

type Props = {
  writing: WritingProps;
  learning: LearningProps;
  social: SocialProps;
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
  const youtubeInfo = formatChannelInfo(channelInfo);

  // Social
  const { myProfile, myPinnedPost, myFeed, myFollowingFeed } =
    await getAtProtoData();
  const atprotoProfile = formatAtprotoProfile(myProfile);
  const atprotoFeed = formatAtprotoFeed(myFeed, myFollowingFeed);
  const atprotoPinnedPost = formatAtprotoPinnedPost(myPinnedPost);

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
        info: youtubeInfo,
      },
      social: {
        info: atprotoProfile,
        feed: atprotoFeed,
        pinnedPost: atprotoPinnedPost,
      },
    },
    revalidate: ONE_MINUTE_IN_SECONDS,
  };
};

const Home: NextPageWithLayout = memo(function Home({
  writing,
  learning,
  social,
}: Props) {
  return (
    <>
      <Box direction="vertical">
        <HomepageHero />

        <Writing {...writing} />

        <Learning {...learning} />

        <Social {...social} />
      </Box>
    </>
  );
});

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
