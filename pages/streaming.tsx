import { Fragment } from "react";
import { VideoCard } from "../components/Card";
import { Divider } from "../components/Divider";
import { Layout, Box } from "../components/Layout";
import { Link } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../constants/date";
import { YOUTUBE_SUBSCRIBE_URL } from "../constants/youtube";
import {
  formatPlaylist,
  formatPlaylistVideo,
  formatPlaylistVideos,
} from "../helpers/youtube";
import { getYoutubeData } from "../lib/youtube";
import { styled } from "../stitches.config";
import { PlaylistPreview, VideoPreview } from "../types/youtube";

type Props = {
  videoPreview: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  playlistVideosPreview: Record<string, VideoPreview[]>;
  timestamp: number;
};

const StyledCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
  gridColumnGap: "$2",
  gridRowGap: "$4",
  borderRadius: 4,
  width: "100%",

  "@bp2": {
    gridTemplateColumns: "repeat(5, 1fr)",
    gridColumnGap: "$4",
    gridRowGap: "$8",
  },
});

export async function getStaticProps() {
  const { latestVideo, playlists, videos } = await getYoutubeData();

  const videoPreview = formatPlaylistVideo(latestVideo);

  const playlistsPreview = formatPlaylist(playlists);

  const playlistVideosPreview = formatPlaylistVideos(videos);

  return {
    props: {
      videoPreview,
      playlistsPreview,
      playlistVideosPreview,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
}

function Streaming({
  videoPreview,
  playlistsPreview,
  playlistVideosPreview,
}: Props) {
  return (
    <Layout>
      <Box
        direction="vertical"
        alignItems="center"
        gap={10}
        css={{ maxWidth: 900, margin: "0 auto" }}
      >
        <TextTitle1>Streaming</TextTitle1>

        <Link href={YOUTUBE_SUBSCRIBE_URL}>
          <TextHeadline>Subscribe to ajames.dev</TextHeadline>
        </Link>

        <Divider />

        {videoPreview ? (
          <>
            <TextTitle2>Latest Video</TextTitle2>

            <Box css={{ maxWidth: 720, margin: "0 auto" }}>
              <VideoCard
                url={videoPreview.url}
                image={videoPreview.thumbnail.src}
                title={videoPreview.title}
                description={videoPreview.description}
                publishDate={videoPreview.publishedAt}
              />
            </Box>
          </>
        ) : null}

        <Divider />

        {playlistsPreview?.map((playlist) => {
          return (
            <Box key={playlist.id} direction="vertical" gap={10}>
              <Box direction="vertical">
                <Box gap={7} alignItems="center" spacingBottom={2}>
                  <TextTitle3 as="h2">{playlist.title}</TextTitle3>
                  <Link href={playlist.url}>Play all</Link>
                </Box>

                <TextBody>{playlist.description}</TextBody>

                <StyledCardContainer spacingTop={10}>
                  {playlistVideosPreview[playlist.id].map((playlistVideo) => (
                    <VideoCard
                      key={playlistVideo.title}
                      url={playlistVideo.url}
                      image={playlistVideo.thumbnail.src}
                      title={playlistVideo.title}
                      publishDate={playlistVideo.publishedAt}
                    />
                  ))}
                </StyledCardContainer>
              </Box>

              <Divider />
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export default Streaming;
