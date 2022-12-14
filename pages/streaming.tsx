import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import { PlayIcon } from "@radix-ui/react-icons";
import { blackA } from "@radix-ui/colors";
import YouTube from "react-youtube";
import { AvatarFallback, AvatarImage, AvatarRoot } from "../components/Avatar";
import { VideoCard } from "../components/Card";
import { Divider } from "../components/Divider";
import {
  PublishDate,
  SubscriberCount,
  VideosTotalCount,
  VideosViewsCount,
} from "../components/Frontmatter";
import { Layout, Box } from "../components/Layout";
import {
  Link,
  YoutubeSubscribeLink,
  TwitterShareLink,
} from "../components/Link";
import {
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../util/date";
import {
  formatChannelInfo,
  formatPlaylist,
  formatPlaylistVideo,
  formatPlaylistVideos,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SHARE_TEXT,
} from "../util/youtube";
import { buildUrl } from "../util/url";
import { getYoutubeData } from "../lib/youtube";
import { styled } from "../stitches.config";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../types/youtube";
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "../components/Scroll";
import { PERSONAL, SITE } from "../util/data";
import { ShareButton } from "../components/Button";
import { H2_STYLES } from "../styles/text";

type Props = {
  videoPreview: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  playlistVideosPreview: PlaylistVideosPreview;
  channelInfoPreview: ChannelInfoPreview;
  timestamp: number;
};

const StyledVideoCardViewport = styled(ScrollAreaViewport, {
  scrollSnapType: "x mandatory",
  scrollPadding: 0,
});

const StyledVideoCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(auto, 1fr))",
  gridColumnGap: "$3",
  borderRadius: 4,
  padding: "$2",
  width: "100%",

  bp2: {
    gridTemplateColumns: "repeat(12, 1fr)",
  },
});

const StyledContentContainer = styled(Box, {
  position: "relative",
  top: -24,

  "@bp2": {
    top: -36,
  },
});

const StyledYouTubePlayer = styled(YouTube, {
  position: "absolute",
  inset: 0,
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 4,
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
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
      <Box
        direction="vertical"
        alignItems="center"
        spacingTop={{ "@initial": 7, "@bp2": 10 }}
        css={{ marginTop: "$5" }}
      >
        <VisuallyHidden.Root>
          <TextTitle1>Streaming</TextTitle1>
        </VisuallyHidden.Root>

        <AspectRatio ratio={2.84 / 1}>
          <StyledImage
            src="/images/banner.png"
            alt={SITE.displayName}
            sizes="100vw"
            priority
            fill
          />
        </AspectRatio>

        <StyledContentContainer
          direction="vertical"
          spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        >
          <Box direction="vertical" spacingBottom={10}>
            <Box direction="vertical">
              <Link href={YOUTUBE_CHANNEL_URL}>
                <AvatarRoot css={{ "@bp2": { width: 72, height: 72 } }}>
                  <AvatarImage
                    src={channelInfoPreview.thumbnail.src}
                    alt={channelInfoPreview.thumbnail.alt}
                  />
                  <AvatarFallback delayMs={600}>
                    {PERSONAL.initials}
                  </AvatarFallback>
                </AvatarRoot>
              </Link>

              <Box direction="vertical" justifyContent="space-between">
                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  spacingTop={4}
                  spacingBottom={8}
                >
                  <TextTitle2>{channelInfoPreview.title}</TextTitle2>

                  <Box css={{ ...H2_STYLES }}>
                    <YoutubeSubscribeLink
                      type="button"
                      css={{
                        display: "none",

                        "@bp2": {
                          display: "flex",
                        },
                      }}
                    />
                  </Box>

                  <YoutubeSubscribeLink
                    type="icon"
                    css={{
                      display: "flex",
                      "@bp2": {
                        display: "none",
                      },
                    }}
                  />
                </Box>

                <Box alignItems="flex-end">
                  <Box as="ul" role="list" direction="vertical" gap={6}>
                    <VideosViewsCount
                      views={channelInfoPreview.viewCount}
                      icon
                    />
                    <SubscriberCount
                      subscribers={channelInfoPreview.subscriberCount}
                      icon
                    />
                    <VideosTotalCount
                      total={channelInfoPreview.videoCount}
                      icon
                    />
                  </Box>

                  <Box
                    gap={4}
                    direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    css={{ width: "auto" }}
                  >
                    <TwitterShareLink
                      url={YOUTUBE_CHANNEL_URL}
                      text={YOUTUBE_SHARE_TEXT}
                      variant="icon"
                    />

                    <Box>
                      <ShareButton
                        url={YOUTUBE_CHANNEL_URL}
                        text={YOUTUBE_SHARE_TEXT}
                        variant="icon"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box spacingVertical={10}>
            <Divider />
          </Box>

          <Box direction="vertical" gap={10} spacingTop={10}>
            {videoPreview ? (
              <Box direction="vertical">
                <Box
                  justifyContent={{
                    "@initial": "space-between",
                    "@bp2": "flex-start",
                  }}
                  gap={10}
                  alignItems="center"
                  spacingBottom={6}
                >
                  <TextTitle3>Latest Video</TextTitle3>

                  <Link href={videoPreview.url} variant="secondary">
                    <PlayIcon aria-hidden />
                    <TextAux>Watch video</TextAux>
                  </Link>
                </Box>

                <Box
                  gap={{ "@initial": 0, "@bp3": 10 }}
                  direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
                >
                  <Box
                    direction="vertical"
                    spacingBottom={4}
                    css={{
                      "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 480 },
                    }}
                  >
                    <AspectRatio ratio={16 / 9}>
                      <StyledYouTubePlayer
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

                  <Box direction="vertical">
                    <Link href={videoPreview.url} variant="secondary">
                      <TextHeadline>
                        <Balancer>{videoPreview.title}</Balancer>
                      </TextHeadline>
                    </Link>

                    <PublishDate
                      date={videoPreview.publishedAt}
                      spacingTop={2}
                      spacingBottom={6}
                    />

                    <TextBody
                      css={{
                        display: "-webkit-box",
                        ["-webkit-line-clamp"]: "3",
                        ["-webkit-box-orient"]: "vertical",
                        overflow: "hidden",
                        textAlign: "justify",
                      }}
                    >
                      {videoPreview.description}
                    </TextBody>

                    <Box spacingTop={3}>
                      <Link href={videoPreview.url} variant="secondary">
                        <TextAux>Read more</TextAux>
                      </Link>
                    </Box>
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
                <Box key={playlist.id} direction="vertical">
                  <Box spacingVertical={10}>
                    <Divider />
                  </Box>

                  <Box
                    direction="vertical"
                    spacingTop={10}
                    css={{ overflowX: "hidden" }}
                  >
                    <Box
                      gap={10}
                      justifyContent={{
                        "@initial": "space-between",
                        "@bp2": "flex-start",
                      }}
                      alignItems="center"
                      spacingBottom={6}
                    >
                      <Link href={playlistUrl} variant="tertiary">
                        <TextTitle3>{playlist.title}</TextTitle3>
                      </Link>

                      <Link href={watchAllUrl} variant="secondary">
                        <PlayIcon aria-hidden />
                        <TextAux>Watch all</TextAux>
                      </Link>
                    </Box>

                    <TextBody
                      css={{
                        textAlign: "justify",
                        maxWidth: "none",
                        "@bp3": { maxWidth: "66%" },
                      }}
                    >
                      {playlist.description}
                    </TextBody>

                    <ScrollAreaRoot>
                      <StyledVideoCardViewport>
                        <StyledVideoCardContainer spacingTop={10}>
                          {playlistVideosPreview[playlist.id].map(
                            (playlistVideo) => (
                              <VideoCard
                                key={playlistVideo.title}
                                url={playlistVideo.url}
                                image={playlistVideo.thumbnail.src}
                                title={playlistVideo.title}
                                publishDate={playlistVideo.publishedAt}
                                css={{ scrollSnapAlign: "start" }}
                              />
                            )
                          )}
                        </StyledVideoCardContainer>
                      </StyledVideoCardViewport>
                      <ScrollAreaScrollbar orientation="horizontal">
                        <ScrollAreaThumb />
                      </ScrollAreaScrollbar>
                    </ScrollAreaRoot>
                  </Box>
                </Box>
              );
            })}

            <Box spacingVertical={10}>
              <Divider />
            </Box>

            <Box direction="vertical" gap={6}>
              <TextTitle3
                css={{ textAlign: "center", color: "$foregroundMuted" }}
              >
                Enjoying the content?
              </TextTitle3>

              <Box
                justifyContent="space-around"
                alignItems="center"
                spacingBottom={10}
                gap={7}
              >
                <TwitterShareLink
                  url={YOUTUBE_CHANNEL_URL}
                  text={YOUTUBE_SHARE_TEXT}
                />

                <YoutubeSubscribeLink />

                <Box>
                  <ShareButton
                    url={YOUTUBE_CHANNEL_URL}
                    text={YOUTUBE_SHARE_TEXT}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </StyledContentContainer>
      </Box>
    </Layout>
  );
}

export default Streaming;
