import { MouseEvent, ReactElement, useCallback, useRef } from "react";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import { PlayIcon } from "@radix-ui/react-icons";
import { VideoCard } from "../components/Card";
import { Divider } from "../components/Divider";
import {
  Frontmatter,
  SubscriberCount,
  VideosTotalCount,
  VideosViewsCount,
} from "../components/Frontmatter";
import { Layout, ActionButtons, HeroLayout } from "../components/Layout";
import {
  Link,
  YoutubeSubscribeLink,
  TwitterShareLink,
} from "../components/Link";
import { TextAux, TextBody, TextTitle2, TextTitle3 } from "../components/Text";
import { ONE_HOUR_IN_SECONDS } from "../util/date";
import {
  formatChannelInfo,
  formatPlaylist,
  formatPlaylistVideo,
  formatPlaylistVideos,
  sortPlaylists,
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
  CardScrollRoot,
  CardScrollViewport,
  Scrollbar,
} from "../components/Scroll";
import { SITE } from "../util/data";
import { Button, ShareButton } from "../components/Button";
import { ICON_SIZE } from "../util/images";
import poster from "../public/images/poster.gif";
import { Box } from "../components/Box";
import { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";

type Props = {
  featuredVideo: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  playlistVideosPreview: PlaylistVideosPreview;
  channelInfoPreview: ChannelInfoPreview;
  timestamp: number;
};

const StyledVideoCardContainer = styled(Box, {
  display: "grid",
  gridTemplateColumns: "repeat(12, minmax(auto, 1fr))",
  gridColumnGap: "$4",
  borderRadius: "$1",
  padding: "$2",
  width: "100%",

  bp2: {
    gridTemplateColumns: "repeat(12, 1fr)",
  },
});

const StyledPoster = styled(Button, {
  width: "100%",
  height: "100%;",

  "@bp3": {
    display: "none",
  },
});

const DynamicYouTube = dynamic(() => import("react-youtube"), {
  ssr: false,
});

const StyledYouTubePlayer = styled(DynamicYouTube, {
  position: "absolute",
  inset: 0,

  "& iframe": {
    borderRadius: "$1",
    boxShadow: "$1",
  },

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
    },
  },

  "&:active": {
    boxShadow: "$5",
  },
});

export async function getStaticProps() {
  const { latestVideo, playlists, videos, channelInfo } =
    await getYoutubeData();

  const featuredVideo = formatPlaylistVideo(latestVideo);

  const playlistsPreview = formatPlaylist(playlists);

  const sortedPlaylistsPreview = sortPlaylists(playlistsPreview);

  const playlistVideosPreview = formatPlaylistVideos(videos);

  const channelInfoPreview = formatChannelInfo(channelInfo);

  return {
    props: {
      featuredVideo,
      playlistsPreview: sortedPlaylistsPreview,
      playlistVideosPreview,
      channelInfoPreview,
    },
    revalidate: ONE_HOUR_IN_SECONDS,
  };
}

const Learning: NextPageWithLayout = ({
  featuredVideo,
  playlistsPreview,
  playlistVideosPreview,
  channelInfoPreview,
}: Props) => {
  const youtubeRef = useRef(null);
  const posterRef = useRef<HTMLButtonElement>(null);

  const handlePlayerReady = useCallback((e) => {
    youtubeRef.current = e.target;
  }, []);

  const handlePlayerPlay = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    posterRef.current.style.display = "none";
  }, []);

  const handlePosterClick = useCallback(() => {
    youtubeRef.current?.playVideo();
  }, []);

  return (
    <Box direction="vertical">
      <HeroLayout />

      <Box
        direction="vertical"
        spacingHorizontal={{ "@initial": 4, "@bp2": 10 }}
        spacingBottom={10}
      >
        <Box direction="vertical" spacingBottom={10}>
          <Box direction="vertical">
            <Box direction="vertical" justifyContent="space-between">
              <Box
                justifyContent="space-between"
                alignItems="center"
                spacingTop={10}
                spacingBottom={10}
              >
                <TextTitle2 as="h1">Learning</TextTitle2>

                <YoutubeSubscribeLink
                  type="button"
                  css={{
                    display: "none",

                    "@bp2": {
                      display: "flex",
                    },
                  }}
                />

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

              <Box alignItems="flex-end" justifyContent="space-between">
                <Frontmatter>
                  <VideosViewsCount total={channelInfoPreview.viewCount} icon />
                  <SubscriberCount
                    total={channelInfoPreview.subscriberCount}
                    icon
                  />
                  <VideosTotalCount
                    total={channelInfoPreview.videoCount}
                    icon
                  />
                </Frontmatter>

                <ActionButtons css={{ width: "auto" }}>
                  <TwitterShareLink
                    url={YOUTUBE_CHANNEL_URL}
                    text={YOUTUBE_SHARE_TEXT}
                    variant="icon"
                  />

                  <ShareButton
                    url={YOUTUBE_CHANNEL_URL}
                    text={YOUTUBE_SHARE_TEXT}
                    variant="icon"
                  />
                </ActionButtons>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box spacingVertical={10}>
          <Divider />
        </Box>

        <Box direction="vertical" gap={10} spacingTop={10}>
          {featuredVideo ? (
            <Box direction="vertical">
              <Box
                justifyContent={{
                  "@initial": "space-between",
                  "@bp2": "flex-start",
                }}
                gap={10}
                alignItems="center"
                spacingBottom={8}
              >
                <TextTitle3 as="h2">Latest Video</TextTitle3>

                <Link href={featuredVideo.url} variant="tertiary">
                  <PlayIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-hidden
                  />
                  <TextAux>Watch video</TextAux>
                </Link>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 10 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={{ "@initial": 8, "@bp3": 0 }}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: 480 },
                  }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <StyledYouTubePlayer
                      videoId={featuredVideo.videoId}
                      onReady={handlePlayerReady}
                      onPlay={handlePlayerPlay}
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

                    <StyledPoster ref={posterRef} onClick={handlePosterClick}>
                      <Image src={poster} sizes="480px" fill alt="" />
                    </StyledPoster>
                  </AspectRatio>
                </Box>

                <Box direction="vertical" gap={4}>
                  <Link href={featuredVideo.url} variant="primary">
                    <TextTitle3>
                      <Balancer>{featuredVideo.title}</Balancer>
                    </TextTitle3>
                  </Link>

                  <TextBody
                    clamp={4}
                    textAlign={{ "@initial": "left", "@bp3": "justify" }}
                    color="secondary"
                  >
                    {featuredVideo.description}
                  </TextBody>

                  <Box>
                    <Link
                      aria-label="Watch video"
                      href={featuredVideo.url}
                      variant="tertiary"
                    >
                      <TextAux>Read the full description</TextAux>
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
                    spacingBottom={4}
                  >
                    <Link href={playlistUrl} variant="secondary">
                      <TextTitle3 as="h2">{playlist.title}</TextTitle3>
                    </Link>

                    <Link href={watchAllUrl} variant="tertiary">
                      <PlayIcon
                        width={ICON_SIZE.m}
                        height={ICON_SIZE.m}
                        aria-hidden
                      />
                      <TextAux>Watch all</TextAux>
                    </Link>
                  </Box>

                  <TextBody
                    color="secondary"
                    css={{
                      textAlign: "justify",
                      maxWidth: "none",
                      "@bp3": { maxWidth: "66%" },
                    }}
                  >
                    {playlist.description}
                  </TextBody>

                  <CardScrollRoot>
                    <CardScrollViewport>
                      <StyledVideoCardContainer spacingVertical={8}>
                        {playlistVideosPreview[playlist.id].map(
                          (playlistVideo) => (
                            <VideoCard
                              id={playlist.id}
                              key={playlistVideo.title}
                              url={playlistVideo.url}
                              image={playlistVideo.thumbnail.src}
                              title={playlistVideo.title}
                              publishDate={playlistVideo.publishedAt}
                              channel={playlistVideo.videoOwnerChannelTitle}
                              css={{
                                scrollSnapAlign: "center",
                                "@bp2": { scrollSnapAlign: "start" },
                              }}
                            />
                          )
                        )}
                      </StyledVideoCardContainer>
                    </CardScrollViewport>
                    <Scrollbar
                      orientation="horizontal"
                      variant="primary"
                      forceMount
                    />
                  </CardScrollRoot>
                </Box>
              </Box>
            );
          })}

          <Box spacingVertical={10}>
            <Divider />
          </Box>

          <Box
            direction="vertical"
            gap={{
              "@initial": 6,
              "@bp2": 10,
            }}
          >
            <TextTitle3 as="h2" textAlign="center" color="secondary">
              Enjoying the content?
            </TextTitle3>

            <Box
              direction={{
                "@initial": "vertical",
                "@bp2": "horizontal",
              }}
              justifyContent="space-around"
              alignItems="center"
              gap={8}
            >
              <TwitterShareLink
                url={YOUTUBE_CHANNEL_URL}
                text={YOUTUBE_SHARE_TEXT}
              />

              <YoutubeSubscribeLink />

              <ShareButton
                url={YOUTUBE_CHANNEL_URL}
                text={YOUTUBE_SHARE_TEXT}
              />
            </Box>
          </Box>

          <Box spacingVertical={10}>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Learning.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Learning;
