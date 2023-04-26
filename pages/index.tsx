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
import { useTheme } from "../hooks/useTheme";
import { PERSONAL, SITE, SOCIAL } from "../util/data";
import Head from "next/head";

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

const Home: NextPageWithLayout = memo(function Home({
  writing,
  learning,
}: Props) {
  const { themeName, themeColor } = useTheme();
  const metaDescription = `${PERSONAL.description}`;
  const metaKeywords = PERSONAL.keywords.join(",");
  const metaTitle = `${PERSONAL.name} | ${PERSONAL.occupation}`;
  const metaContent = `${SITE.url}/api/og`;

  return (
    <>
      <Head>
        <title key="title">{metaTitle}</title>
        <meta key="description" name="description" content={metaDescription} />
        <meta key="author" name="author" content={PERSONAL.name} />
        <meta key="keywords" name="keywords" content={metaKeywords} />
        <meta key="image" name="image" content={metaContent} />

        {/* Twitter */}
        <meta key="twitter:card" name="twitter:card" content="summary" />
        <meta key="twitter:image" name="twitter:image" content={metaContent} />
        <meta key="twitter:title" name="twitter:title" content={metaTitle} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={metaDescription}
        />
        <meta
          key="twitter:site"
          name="twitter:site"
          content={SOCIAL.twitter.handle}
        />
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content={SOCIAL.twitter.handle}
        />

        {/* OG */}
        <meta key="og:image" name="og:image" content={metaContent} />
        <meta key="og:locale" name="og:locale" content="en_GB" />
        <meta key="og:type" name="og:type" content="website" />
        <meta key="og:url" name="og:url" content={SITE.url} />
        <meta key="og:title" name="og:title" content={metaTitle} />
        <meta
          key="og:description"
          name="og:description"
          content={metaDescription}
        />

        <meta key="robots" name="robots" content="index,follow" />
        <meta key="generator" name="generator" content="Next.js" />
        <meta key="charset" charSet="utf-8" />
        <meta key="theme-color" name="theme-color" content={themeColor} />
        <meta key="color-scheme" name="color-scheme" content={themeName} />
      </Head>

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
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Home;
