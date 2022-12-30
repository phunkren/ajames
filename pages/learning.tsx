import { GetStaticProps } from "next";
import { Layout, VStack } from "../components/Layout";
import { TextTitle1, TextTitle2 } from "../components/Text";
import {
  getLatestLiveStream,
  getLatestVideo,
  getPlaylists,
} from "../lib/youtube";

export const getStaticProps: GetStaticProps = async () => {
  const latestLiveStream = await getLatestLiveStream();
  const latestVideo = await getLatestVideo();
  const playlists = await getPlaylists();

  return {
    props: {
      liveStream: latestLiveStream,
      video: latestVideo,
      playlists,
    },
  };
};

function Learning({ video, liveStream, playlists }) {
  return (
    <Layout>
      <VStack alignItems="center" gap={10}>
        <TextTitle1>Learning</TextTitle1>

        <TextTitle2>Latest Live Stream</TextTitle2>
        <div>
          <pre>
            <code>{JSON.stringify(liveStream)}</code>
          </pre>
        </div>

        <TextTitle2>Latest Video</TextTitle2>
        <div>
          <pre>
            <code>{JSON.stringify(video)}</code>
          </pre>
        </div>

        <TextTitle2>Playlists</TextTitle2>
        <div>
          <pre>
            <code>{JSON.stringify(playlists)}</code>
          </pre>
        </div>
      </VStack>
    </Layout>
  );
}

export default Learning;
