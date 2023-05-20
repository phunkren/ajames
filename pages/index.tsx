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
import { SocialSponsored } from "../components/Social";
import { getPosts } from "../lib/notion";
import { getYoutubeData } from "../lib/youtube";
import { ONE_MINUTE_IN_SECONDS } from "../util/date";
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

        <SocialSponsored />
      </Box>
    </>
  );
});

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
