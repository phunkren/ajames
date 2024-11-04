import { useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Balancer from "react-wrap-balancer";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import Image from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";
import { YOUTUBE_CHANNEL_URL, YOUTUBE_SHARE_TEXT } from "../../util/youtube";
import { css, styled } from "../../stitches.config";
import { buildUrl } from "../../util/url";
import { ICON_SIZE } from "../../util/images";
import { SITE } from "../../util/data";
import {
  ChannelInfoPreview,
  PlaylistPreview,
  PlaylistVideosPreview,
  VideoPreview,
} from "../../util/youtube";
import {
  Frontmatter,
  SubscriberCount,
  VideosTotalCount,
  VideosViewsCount,
} from "../Frontmatter";
import { ActionButtons } from "../Layout";
import { Link, YoutubeSubscribeLink, BlueskyShareLink } from "../Link";
import { TextAux, TextBody, TextTitle1, TextTitle2, TextTitle3 } from "../Text";
import { ShareButton } from "../Button";
import { Box } from "../Box";
import { VideoCard } from "../Card";
import { Divider } from "../Divider";

export type Props = {
  featured: VideoPreview;
  uploads: PlaylistPreview[];
  subscriptions: PlaylistPreview[];
  info: ChannelInfoPreview;
};

const bg = css({
  background: `$blackA5`,
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

export const LEARNING_ID = "learning";

export const Learning = ({ featured, uploads, subscriptions, info }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const callback = debounce(
      (entries) => {
        const button = document.querySelector(
          ".lty-playbtn"
        ) as HTMLButtonElement;

        if (button && entries[0].isIntersecting) {
          button.click();
        }
      },
      100,
      { leading: true, trailing: true }
    );

    const observer = new IntersectionObserver(callback, {});
    observer.observe(parentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      ref={parentRef}
      as="section"
      display={{ print: "none", "@initial": "flex" }}
      direction="vertical"
      spacingTop={{ "@initial": 11, "@bp2": 10, "@bp3": 11 }}
      spacingBottom={{ "@initial": 12, "@print": 0 }}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        direction="vertical"
        gap={12}
        container="l"
        spacingBottom={{ "@print": 0, "@initial": 10, "@bp2": 11 }}
        css={{ zIndex: "$1" }}
      >
        <Box direction="vertical">
          <Box direction="vertical">
            <Box direction="vertical" justifyContent="space-between" gap={10}>
              <Box direction="vertical">
                <Box
                  id={LEARNING_ID}
                  justifyContent="space-between"
                  alignItems="center"
                  spacingTop={12}
                >
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
              </Box>

              <Box alignItems="flex-end" justifyContent="space-between">
                <Frontmatter>
                  <VideosViewsCount total={info.viewCount} icon />
                  <SubscriberCount total={info.subscriberCount} icon />
                  <VideosTotalCount total={info.videoCount} icon />
                </Frontmatter>

                <ActionButtons css={{ width: "auto" }}>
                  <BlueskyShareLink
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
          {featured ? (
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
                <TextTitle2 as="h3">Featured</TextTitle2>

                <Link href={featured.url} variant="tertiary">
                  <PlayIcon
                    width={ICON_SIZE.m}
                    height={ICON_SIZE.m}
                    aria-hidden
                  />
                  <TextAux>Watch video</TextAux>
                </Link>
              </Box>

              <Box
                gap={{ "@initial": 0, "@bp3": 11 }}
                direction={{ "@initial": "vertical", "@bp3": "horizontal" }}
              >
                <Box
                  direction="vertical"
                  spacingBottom={{ "@initial": 8, "@bp3": 0 }}
                  css={{
                    "@bp3": { flexGrow: 0, flexShrink: 0, flexBasis: "45%" },
                  }}
                >
                  <LiteYouTubeEmbed
                    id={featured.id} // Default none, id of the video or playlist
                    title={featured.title} // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
                    params={`start=300&mute=1&modestbranding=1&rel=0&widget_referrer=${SITE.url}&controls=0`} // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
                    poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
                    playlist={false} // Use true when your ID be from a playlist
                    adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
                    noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
                  />
                </Box>

                <Box direction="vertical" gap={4}>
                  <Link href={featured.url} variant="primary">
                    <TextTitle3>
                      <Balancer>{featured.title}</Balancer>
                    </TextTitle3>
                  </Link>

                  <TextBody
                    clamp={4}
                    color="secondary"
                    css={{
                      maxWidth: "none",
                      "@bp2": { maxWidth: "75%" },
                    }}
                  >
                    {featured.description}
                  </TextBody>

                  <Box>
                    <Link
                      aria-label="Watch video"
                      href={featured.url}
                      variant="tertiary"
                    >
                      <TextAux>Read the full description</TextAux>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : null}

          <Box direction="vertical" gap={12}>
            <Box direction="vertical">
              <Box direction="vertical">
                <Box
                  gap={10}
                  justifyContent={{
                    "@initial": "space-between",
                    "@bp2": "flex-start",
                  }}
                  alignItems="baseline"
                  spacingVertical={2}
                >
                  <Link href="#" variant="secondary">
                    <TextTitle2 as="h3">Uploads</TextTitle2>
                  </Link>

                  <Link href={YOUTUBE_CHANNEL_URL} variant="tertiary">
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
                  A collection of recent uploads from my YouTube channel
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
                  {uploads.map((upload) => (
                    <VideoCard
                      id={upload.id}
                      key={upload.title}
                      url={upload.url}
                      image={upload.thumbnail.src}
                      title={upload.title}
                      publishDate={upload.publishedAt}
                      channel={upload.videoOwnerChannelTitle}
                      css={{
                        scrollSnapAlign: "center",
                        "@bp2": { scrollSnapAlign: "start" },
                      }}
                    />
                  ))}
                </StyledVideoCardContainer>
              </Box>
            </Box>

            <Box direction="vertical">
              <Box direction="vertical">
                <Box
                  gap={10}
                  justifyContent={{
                    "@initial": "space-between",
                    "@bp2": "flex-start",
                  }}
                  alignItems="baseline"
                  spacingVertical={2}
                >
                  <Link href="#" variant="secondary">
                    <TextTitle2 as="h3">Subscriptions</TextTitle2>
                  </Link>

                  {/* <Link href={watchAllUrl} variant="tertiary">
                    <PlayIcon
                      width={ICON_SIZE.m}
                      height={ICON_SIZE.m}
                      aria-hidden
                    />
                    <TextAux>Watch all</TextAux>
                  </Link> */}
                </Box>

                <TextBody
                  color="secondary"
                  css={{
                    textAlign: "justify",
                    maxWidth: "none",
                    "@bp3": { maxWidth: "66%" },
                  }}
                >
                  The latest content from channels that I’m subscribed to on
                  YouTube
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
                  {subscriptions.map((subscription) => (
                    <VideoCard
                      id={subscription.id}
                      key={subscription.title}
                      url={subscription.url}
                      image={subscription.thumbnail.src}
                      title={subscription.title}
                      publishDate={subscription.publishedAt}
                      channel={subscription.videoOwnerChannelTitle}
                      css={{
                        scrollSnapAlign: "center",
                        "@bp2": { scrollSnapAlign: "start" },
                      }}
                    />
                  ))}
                </StyledVideoCardContainer>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
