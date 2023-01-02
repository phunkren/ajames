import Image from "next/image";
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
import { formatPlaylist, formatPlaylistItem } from "../helpers/youtube";
import { PlaylistPreview, VideoPreview } from "../types/youtube";
import { getYoutubeData } from "./api/youtube";

type Props = {
  videoPreview: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  timestamp: number;
};

export async function getStaticProps() {
  const { latestVideo, playlists } = await getYoutubeData();

  const videoPreview = formatPlaylistItem(latestVideo);
  const playlistsPreview = formatPlaylist(playlists);

  const timestamp = new Date().getTime();

  return {
    props: {
      videoPreview,
      playlistsPreview,
      timestamp,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
}

function Streaming({ videoPreview, playlistsPreview }: Props) {
  return (
    <Layout>
      <Box
        direction="vertical"
        alignItems="center"
        gap={10}
        css={{ maxWidth: 720, margin: "0 auto" }}
      >
        <TextTitle1>Streaming</TextTitle1>

        <Link href={YOUTUBE_SUBSCRIBE_URL}>
          <TextHeadline>Subscribe to ajames.dev</TextHeadline>
        </Link>

        {videoPreview ? (
          <>
            <TextTitle2>Latest Video</TextTitle2>

            <Box direction="vertical">
              <Image
                src={videoPreview.thumbnail.src}
                width={videoPreview.thumbnail.width}
                height={videoPreview.thumbnail.height}
                alt={videoPreview.thumbnail.alt}
              />
              <TextTitle3>{videoPreview.title}</TextTitle3>
              <TextBody>{videoPreview.description}</TextBody>
              <TextAux>{videoPreview.publishedAt}</TextAux>
              <Link href={videoPreview.url}>
                <TextHeadline>Watch</TextHeadline>
              </Link>
            </Box>
          </>
        ) : null}

        {playlistsPreview ? (
          <>
            <TextTitle2>Playlists</TextTitle2>

            {playlistsPreview.map((playlist) => {
              return (
                <Box direction="vertical" key={playlist.id}>
                  <Image
                    src={playlist.thumbnail.src}
                    width={playlist.thumbnail.width}
                    height={playlist.thumbnail.height}
                    alt={playlist.thumbnail.alt}
                  />
                  <TextTitle3>{playlist.title}</TextTitle3>
                  <TextBody>{playlist.description}</TextBody>
                  <Link href={playlist.url}>
                    <TextHeadline>View Playlist</TextHeadline>
                  </Link>
                </Box>
              );
            })}
          </>
        ) : null}
      </Box>
    </Layout>
  );
}

export default Streaming;
