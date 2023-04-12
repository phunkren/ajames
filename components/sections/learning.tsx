import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import dynamic from "next/dynamic";
import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";
import { VideoCard } from "../Card";
import { Divider } from "../Divider";
import {
  Frontmatter,
  SubscriberCount,
  VideosTotalCount,
  VideosViewsCount,
} from "../Frontmatter";
import { ActionButtons } from "../Layout";
import { Link, YoutubeSubscribeLink, TwitterShareLink } from "../Link";
import { TextAux, TextBody, TextTitle1, TextTitle2, TextTitle3 } from "../Text";
import { YOUTUBE_CHANNEL_URL, YOUTUBE_SHARE_TEXT } from "../../util/youtube";
import { buildUrl } from "../../util/url";
import { styled } from "../../stitches.config";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../../util/youtube";
import { CardScrollRoot, CardScrollViewport, Scrollbar } from "../Scroll";
import { SITE } from "../../util/data";
import { ShareButton } from "../Button";
import { ICON_SIZE } from "../../util/images";
import { Box } from "../Box";
import book from "../../public/images/book.png";

export type Props = {
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

const StyledHeroImage = styled(Image, {
  objectFit: "contain",
  position: "absolute",
  pointerEvents: "none",
});

export const LEARNING_ID = "learning";

export const Learning = ({
  featuredVideo,
  playlistsPreview,
  playlistVideosPreview,
  channelInfoPreview,
}: Props) => {
  return (
    <Box
      id={LEARNING_ID}
      as="section"
      direction="vertical"
      spacingVertical={12}
      css={{
        background: `linear-gradient($slate2 0.04%, $slate1 100.04%)`,
      }}
    >
      <Box
        direction="vertical"
        display={{ print: "none", "@initial": "flex" }}
        gap={12}
        container="l"
      >
        <Box>
          <AspectRatio.Root ratio={2.5 / 1} asChild>
            <StyledHeroImage src={book} alt="" fill quality={100} />
          </AspectRatio.Root>
        </Box>

        <Box direction="vertical">
          <Box direction="vertical">
            <Box direction="vertical" justifyContent="space-between" gap={10}>
              <Box justifyContent="space-between" alignItems="center">
                <TextTitle1 as="h2">Learning</TextTitle1>

                <Box
                  position="relative"
                  css={{
                    display: "none",
                    "@bp2": { display: "flex", left: "-$1" },
                  }}
                >
                  <YoutubeSubscribeLink type="button" />
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

              <Box>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box direction="vertical" gap={12}>
          {featuredVideo ? (
            <Box direction="vertical">
              <Box
                justifyContent={{
                  "@initial": "space-between",
                  "@bp2": "flex-start",
                }}
                gap={10}
                alignItems="baseline"
                spacingBottom={8}
              >
                <TextTitle2 as="h3">Latest Video</TextTitle2>

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
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: "50%" },
                  }}
                >
                  <AspectRatio.Root ratio={16 / 9}>
                    <StyledYouTubePlayer
                      videoId={featuredVideo.videoId}
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
                  </AspectRatio.Root>
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

          <Box direction="vertical" gap={11}>
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
                  <Box direction="vertical" css={{ overflowX: "hidden" }}>
                    <Box
                      gap={10}
                      justifyContent={{
                        "@initial": "space-between",
                        "@bp2": "flex-start",
                      }}
                      alignItems="baseline"
                    >
                      <Link href={playlistUrl} variant="secondary">
                        <TextTitle2 as="h3">{playlist.title}</TextTitle2>
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
                        <StyledVideoCardContainer spacingVertical={10}>
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
                        variant="secondary"
                        forceMount
                      />
                    </CardScrollRoot>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box>
            <Divider />
          </Box>

          <Box
            direction="vertical"
            gap={{
              "@initial": 6,
              "@bp2": 8,
            }}
          >
            <TextTitle3 as="h2" textAlign="center" color="secondary">
              Enjoying the video content?
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

          <Box>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
