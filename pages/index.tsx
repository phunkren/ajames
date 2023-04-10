import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { Box } from "../components/Box";
import { HeroLayout, Layout } from "../components/Layout";
import { About } from "../components/sections/about";
import {
  Learning,
  Props as LearningProps,
} from "../components/sections/learning";
import { Writing, Props as WritingProps } from "../components/sections/writing";
import { createPosts, generateRSSFeed, getPosts } from "../lib/notion";
import { getYoutubeData } from "../lib/youtube";
import { ONE_HOUR_IN_SECONDS } from "../util/date";
import { getTags, sortPosts } from "../util/notion";
import {
  formatChannelInfo,
  formatPlaylist,
  formatPlaylistVideo,
  formatPlaylistVideos,
  sortPlaylists,
} from "../util/youtube";
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
  const { latestVideo, playlists, videos, channelInfo } =
    await getYoutubeData();
  const featuredVideo = formatPlaylistVideo(latestVideo);
  const playlistsPreview = formatPlaylist(playlists);
  const sortedPlaylistsPreview = sortPlaylists(playlistsPreview);
  const playlistVideosPreview = formatPlaylistVideos(videos);
  const channelInfoPreview = formatChannelInfo(channelInfo);

  if (process.env.NODE_ENV === "production") {
    // Create a .mdx file for each blog post
    await createPosts(posts);

    // Create a feed.xml file for blog subscriptions
    generateRSSFeed(sortedPosts);
  }

  return {
    props: {
      writing: {
        posts: sortedPosts,
        tags: postTags,
      },
      learning: {
        featuredVideo,
        playlistsPreview: sortedPlaylistsPreview,
        playlistVideosPreview,
        channelInfoPreview,
      },
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
};

const Home: NextPageWithLayout = ({ writing, learning }: Props) => {
  return (
    <Box
      direction="vertical"
      justifyContent="center"
      alignItems="center"
      flexGrow
    >
      <HeroLayout />

      <About />

      <Writing {...writing} />

      <Learning {...learning} />
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
