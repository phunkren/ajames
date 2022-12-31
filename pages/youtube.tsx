import { youtube_v3 } from "googleapis";
import Image from "next/image";
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
import { YOUTUBE_SUBSCRIBE_URL } from "../constants/youtube";
import {
  formatLatestResponse,
  formatPlaylistsResponse,
} from "../helpers/youtube";
import { getYoutubeData } from "./api/youtube";

type Props = {
  latestVideo: youtube_v3.Schema$SearchResult;
  playlists: youtube_v3.Schema$Playlist[];
};

export async function getServerSideProps() {
  const { latestVideo, playlists } = await getYoutubeData();

  return {
    props: {
      latestVideo,
      playlists,
    },
  };
}

function YouTube({ latestVideo, playlists }: Props) {
  const videoPreview = formatLatestResponse(latestVideo);
  const playlistsPreview = formatPlaylistsResponse(playlists);

  return (
    <Layout>
      <VStack
        alignItems="center"
        gap={10}
        css={{ maxWidth: 720, margin: "0 auto" }}
      >
        <TextTitle1>YouTube</TextTitle1>

        <Link href={YOUTUBE_SUBSCRIBE_URL}>
          <TextHeadline>Subscribe to ajames.dev</TextHeadline>
        </Link>

        {videoPreview ? (
          <>
            <TextTitle2>Latest Video</TextTitle2>

            <VStack>
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
            </VStack>
          </>
        ) : null}

        {playlistsPreview ? (
          <>
            <TextTitle2>Playlists</TextTitle2>

            {playlistsPreview.map((playlist) => {
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
