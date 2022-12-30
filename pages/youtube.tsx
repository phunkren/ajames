import { GetStaticProps } from "next";
import Image from "next/image";
import { Button } from "../components/Button";
import { Layout, VStack } from "../components/Layout";
import { Link } from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import {
  formatLatestResponse,
  formatPlaylistsResponse,
  getLatestLiveStream,
  getLatestVideo,
  getPlaylists,
  getSubscriptionUrl,
} from "../lib/youtube";
import { PlaylistPreview, VideoPreview } from "../types/youtube";

type Props = {
  video: VideoPreview | null;
  liveStream: VideoPreview | null;
  playlists: PlaylistPreview[] | null;
  subscriptionUrl: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const latestLiveStreamResponse = await getLatestLiveStream();
  const latestLiveStream = !latestLiveStreamResponse
    ? formatLatestResponse(latestLiveStreamResponse)
    : null;

  const latestVideoResponse = await getLatestVideo();
  const latestVideo = !latestVideoResponse.error
    ? formatLatestResponse(latestVideoResponse)
    : null;

  const playlistsResponse = await getPlaylists();

  const playlists = !playlistsResponse.error
    ? formatPlaylistsResponse(playlistsResponse)
    : null;

  const subscriptionUrl = getSubscriptionUrl();

  return {
    props: {
      liveStream: latestLiveStream,
      video: latestVideo,
      playlists,
      subscriptionUrl,
    },
  };
};

function YouTube({ video, liveStream, playlists, subscriptionUrl }: Props) {
  return (
    <Layout>
      <VStack alignItems="center" gap={10}>
        <TextTitle1>YouTube</TextTitle1>

        <Link href={subscriptionUrl}>
          <TextHeadline>Subscribe to ajames.dev</TextHeadline>
        </Link>

        {liveStream ? (
          <>
            <TextTitle2>Latest Live Stream</TextTitle2>

            <VStack>
              <Image
                src={liveStream.thumbnail.src}
                width={liveStream.thumbnail.width}
                height={liveStream.thumbnail.height}
                alt={liveStream.thumbnail.alt}
              />
              <TextTitle3>{liveStream.title}</TextTitle3>
              <TextBody>{liveStream.description}</TextBody>
              <TextAux>{liveStream.publishedAt}</TextAux>
              <Link href={liveStream.url}>
                <TextHeadline>Watch</TextHeadline>
              </Link>
            </VStack>
          </>
        ) : null}

        {video ? (
          <>
            <TextTitle2>Latest Video</TextTitle2>

            <VStack>
              <Image
                src={video.thumbnail.src}
                width={video.thumbnail.width}
                height={video.thumbnail.height}
                alt={video.thumbnail.alt}
              />
              <TextTitle3>{video.title}</TextTitle3>
              <TextBody>{video.description}</TextBody>
              <TextAux>{video.publishedAt}</TextAux>
              <Link href={video.url}>
                <TextHeadline>Watch</TextHeadline>
              </Link>
            </VStack>
          </>
        ) : null}

        {playlists ? (
          <>
            <TextTitle2>Playlists</TextTitle2>

            {playlists.map((playlist) => {
              return (
                <VStack key={playlist.id}>
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
                </VStack>
              );
            })}
          </>
        ) : null}
      </VStack>
    </Layout>
  );
}

export default YouTube;
