import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
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
import { css, styled } from "../../stitches.config";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../../util/youtube";
import { ShareButton } from "../Button";
import { ICON_SIZE } from "../../util/images";
import { Box } from "../Box";
import book from "../../public/images/book.png";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { useEffect } from "react";
import { SITE } from "../../util/data";

export type Props = {
  featuredVideo: VideoPreview;
  playlistsPreview: PlaylistPreview[];
  playlistVideosPreview: PlaylistVideosPreview;
  channelInfoPreview: ChannelInfoPreview;
  timestamp: number;
};

const bg = css({
  background: `linear-gradient(2deg, $slate2 0.04%, $slate1 100.04%)`,
});

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

const StyledHeroImage = styled(Image, {
  objectFit: "contain",
  position: "absolute",
  pointerEvents: "none",
});

export const LEARNING_ID = "learning";

const Learning = ({
  featuredVideo,
  playlistsPreview,
  playlistVideosPreview,
  channelInfoPreview,
}: Props) => {
  // https://github.com/ibrahimcesar/react-lite-youtube-embed/issues/50
  useEffect(() => {
    const button = document.querySelector(".lty-playbtn") as HTMLButtonElement;

    if (!button) return;

    function createObserver() {
      let observer;

      let options = {
        rootMargin: "-50%",
        threshold: 1,
      };

      observer = new IntersectionObserver(() => button.click(), options);
      observer.observe(button);
    }
    return createObserver();
  }, []);

  return (
    <Box
      as="section"
      display={{ print: "none", "@initial": "flex" }}
      direction="vertical"
      spacingTop={12}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        id={LEARNING_ID}
        direction="vertical"
        gap={12}
        container="l"
        spacingVertical={{ "@print": 0, "@initial": 10, "@bp2": 12 }}
      >
        <Box>
          <AspectRatio.Root ratio={2.5 / 1} asChild>
            <StyledHeroImage
              src={book}
              alt=""
              sizes="(max-width: 1280px) 50vw, 33vw"
              fill
            />
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
                  <LiteYouTubeEmbed
                    id={featuredVideo.videoId} // Default none, id of the video or playlist
                    title={featuredVideo.title} // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
                    params={`mute=1&modestbranding=1&rel=0&widget_referrer=${SITE.url}&controls=0`} // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
                    poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
                    playlist={false} // Use true when your ID be from a playlist
                    adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
                    noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
                  />
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
                      spacingBottom={2}
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

                    <StyledVideoCardContainer
                      spacingVertical={10}
                      css={{
                        overflowY: "hidden",
                        scrollSnapType: "x mandatory",

                        scrollPadding: "0 $1",
                        width: "100%",
                        height: "100%",

                        perspective: 100,
                        transform: "translate3d(0,0,0)",
                        ["-webkit-transform"]: "translateZ(0,0,0)",
                      }}
                    >
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
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Learning;
