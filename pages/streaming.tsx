import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { PlayIcon, VideoIcon } from "@radix-ui/react-icons";
import YouTube from "react-youtube";
import { AvatarFallback, AvatarImage, AvatarRoot } from "../components/Avatar";
import { VideoCard } from "../components/Card";
import { Divider } from "../components/Divider";
import { PublishDate } from "../components/Frontmatter";
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
import { PERSONAL } from "../data/personal";
import { SITE } from "../data/site";
import { buildUrl } from "../helpers/url";
import {
  formatChannelInfo,
  formatPlaylist,
  formatPlaylistVideo,
  formatPlaylistVideos,
} from "../helpers/youtube";
import { getYoutubeData } from "../lib/youtube";
import { styled } from "../stitches.config";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../types/youtube";
import { ScrollAreaRoot, ScrollAreaScrollbar } from "../components/Scroll";

type Props = {
  videoPreview: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  playlistVideosPreview: PlaylistVideosPreview;
  channelInfoPreview: ChannelInfoPreview;
  timestamp: number;
};

const StyledCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(auto, 1fr))",
  gridColumnGap: "$3",
  borderRadius: 4,
  padding: "$2",

  bp2: {
    gridTemplateColumns: "repeat(12, 1fr)",
  },
});

const StyledSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "$2",
  background: "red",
  padding: "$2 $4",
  borderRadius: 4,
  color: "white",
});

const StyledYouTube = styled(YouTube, {
  position: "absolute",
  inset: 0,
});

export async function getStaticProps() {
  const { latestVideo, playlists, videos, channelInfo } =
    await getYoutubeData();

  const videoPreview = formatPlaylistVideo(latestVideo);

  const playlistsPreview = formatPlaylist(playlists);

  const playlistVideosPreview = formatPlaylistVideos(videos);

  const channelInfoPreview = formatChannelInfo(channelInfo);

  return {
    props: {
      videoPreview,
      playlistsPreview,
      playlistVideosPreview,
      channelInfoPreview,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
}

function Streaming({
  videoPreview,
  playlistsPreview,
  playlistVideosPreview,
  channelInfoPreview,
}: Props) {
  return (
    <Layout>
      <Box direction="vertical" alignItems="center" gap={10}>
        <VisuallyHidden.Root>
          <TextTitle1>Streaming</TextTitle1>
        </VisuallyHidden.Root>

        <Box
          justifyContent="space-between"
          alignItems="center"
          css={{ width: "100%" }}
        >
          <Box gap={4} alignItems="center">
            <AvatarRoot>
              <AvatarImage
                src={channelInfoPreview.thumbnail.src}
                alt={channelInfoPreview.thumbnail.alt}
              />
              <AvatarFallback delayMs={600}>{PERSONAL.initials}</AvatarFallback>
            </AvatarRoot>

            <Box direction="vertical">
              <TextHeadline>{channelInfoPreview.title}</TextHeadline>
              <TextAux>
                {channelInfoPreview.subscriberCount} subscribers
              </TextAux>
            </Box>
          </Box>

          <StyledSubscription href={YOUTUBE_SUBSCRIBE_URL} variant="tertiary">
            <VideoIcon width={24} height={24} /> <TextAux>Subscribe</TextAux>
          </StyledSubscription>
        </Box>

        <Divider />

        {videoPreview ? (
          <Box direction="vertical">
            <Box
              justifyContent={{
                "@initial": "space-between",
                "@bp2": "flex-start",
              }}
              gap={7}
              alignItems="center"
              spacingBottom={2}
            >
              <TextTitle3 as="h2">Latest Video</TextTitle3>
              <Link href={videoPreview.url} variant="secondary">
                <PlayIcon aria-hidden /> Watch video
              </Link>
            </Box>

            <Box
              gap={{ "@initial": 2, "@bp3": 10 }}
              flexWrap={{ "@initial": "wrap", "@bp3": "nowrap" }}
            >
              <Box
                position="relative"
                direction="vertical"
                spacingVertical={2}
                css={{
                  "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 480 },
                }}
              >
                <AspectRatio ratio={16 / 9}>
                  <StyledYouTube
                    videoId={videoPreview.videoId}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        mute: 1,
                        modestbranding: 1,
                        rel: 0,
                        widget_referrer: SITE.url,
                        controls: 0,
                      },
                    }}
                  />
                </AspectRatio>
              </Box>

              <Box direction="vertical" gap={2}>
                <Link href={videoPreview.url} variant="secondary">
                  <TextHeadline>{videoPreview.title}</TextHeadline>
                </Link>
                <PublishDate date={videoPreview.publishedAt} />
                <TextBody>{videoPreview.description}</TextBody>
                <Link href={videoPreview.url} variant="secondary">
                  <TextAux>Read more </TextAux>
                </Link>
              </Box>
            </Box>
          </Box>
        ) : null}

        {playlistsPreview?.map((playlist) => {
          const firstVideo = playlistVideosPreview[playlist.id][0];

          const playlistUrl = buildUrl("https://youtube.com/playlist", {
            list: playlist.id,
          });

          const watchAllUrl = buildUrl("https://youtube.com/watch", {
            v: firstVideo.videoId,
            list: playlist.id,
          });

          return (
            <Box key={playlist.id} direction="vertical" gap={10}>
              <Divider />

              <Box direction="vertical" css={{ overflowX: "hidden" }}>
                <Box
                  gap={7}
                  justifyContent={{
                    "@initial": "space-between",
                    "@bp2": "flex-start",
                  }}
                  alignItems="center"
                  spacingBottom={2}
                >
                  <Link href={playlistUrl} variant="tertiary">
                    <TextTitle3 as="h2">{playlist.title}</TextTitle3>
                  </Link>

                  <Link href={watchAllUrl} variant="secondary">
                    <PlayIcon aria-hidden /> Watch all
                  </Link>
                </Box>

                <TextBody>{playlist.description}</TextBody>

                <ScrollAreaRoot>
                  <ScrollAreaViewport>
                    <StyledCardContainer spacingVertical={7}>
                      {playlistVideosPreview[playlist.id].map(
                        (playlistVideo) => (
                          <VideoCard
                            key={playlistVideo.title}
                            url={playlistVideo.url}
                            image={playlistVideo.thumbnail.src}
                            title={playlistVideo.title}
                            publishDate={playlistVideo.publishedAt}
                          />
                        )
                      )}
                    </StyledCardContainer>
                  </ScrollAreaViewport>

                  <ScrollAreaScrollbar orientation="horizontal" />
                </ScrollAreaRoot>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Layout>
  );
}

export default Streaming;
