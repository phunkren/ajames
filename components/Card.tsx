import {
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
  ReactNode,
  Ref,
} from "react";
import Image, { StaticImageData } from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blackA, whiteA } from "@radix-ui/colors";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { PostTags, PublishDate, YoutubeChannel } from "./Frontmatter";
import { Box } from "./Box";
import { Emoji, TextAux, TextHeadline } from "./Text";
import { BuyMeCoffeeLink, Link } from "./Link";
import { PreviewToggle } from "./Button";
import { BLUR_DATA_URL } from "../util/images";
import { YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID } from "../util/youtube";
import { CSS } from "../stitches.config";
import { Tag } from "../util/notion";
import banner from "../public/images/banner.png";

export type CardChildProps = {
  ref: Ref<HTMLAnchorElement>;
  isPreviewVisible: boolean;
  onPreviewToggle: (pressed: boolean) => void;
};

export type CardProps = {
  image: string | StaticImageData;
  children: (props: CardChildProps) => ReactNode;
};

export type BlogCardProps = CSS & {
  url: string;
  image: string;
  description: string;
  title: string;
  emoji: string;
  tags: Tag[];
};

export type VideoCardProps = CSS & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  channel?: string;
  description?: string;
  css: any;
};

const StyledLink = styled(Link, {
  "@media(hover)": {
    "&:hover": {
      color: "inherit",
    },
  },

  "&:focus": {
    outline: "none",
  },
});

const StyledCardOuter = styled(Box, {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  minWidth: 275,
  boxShadow: "$1",
  borderRadius: "$1",
  borderColor: "transparent",
  borderWidth: 2,
  borderStyle: "solid",
  overflow: "hidden",
  transition:
    "background $transitions$durationQuick $transitions$functionDefault, box-shadow $transitions$durationQuick $transitions$functionDefault, border-color $transitions$durationQuick $transitions$functionDefault",
  ["-webkit-transition"]:
    "background $transitions$durationQuick $transitions$functionDefault, box-shadow $transitions$durationQuick $transitions$functionDefault, border-color $transitions$durationQuick $transitions$functionDefault",

  "& div[data-radix-aspect-ratio-wrapper]": {
    overflow: "hidden",
  },

  "& img": {
    position: "relative",
    left: "10px",
    width: "calc(100% + 2px)",
    filter: "brightness(100%)",
    ["-webkit-transition"]:
      "filter $transitions$durationQuick $transitions$functionDefault",
    transition:
      "filter $transitions$durationQuick $transitions$functionDefault",
  },

  "& button": {
    outline: "2px solid transparent",
    outlineOffset: 2,
    transition:
      "outline $transitions$durationQuick $transitions$functionDefault",
    ["-webkit-transition"]:
      "outline $transitions$durationQuick $transitions$functionDefault",
  },

  "@media(hover)": {
    "&:hover:not(:has(button:hover))": {
      boxShadow: "$4",
      borderColor: "$hover",
      transition:
        "box-shadow $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
      ["-webkit-transition"]:
        "box-shadow $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",

      "& img": {
        filter: "brightness(95%)",
        transition:
          "filter $transitions$durationDefault $transitions$functionDefault",
        ["-webkit-transition"]:
          "filter $transitions$durationDefault $transitions$functionDefault",
      },

      [`.${darkTheme} &`]: {
        background: whiteA.whiteA4,
        transition:
          "background $transitions$durationDefault $transitions$functionDefault",
        ["-webkit-transition"]:
          "background $transitions$durationDefault $transitions$functionDefault",
      },

      [`.${lightTheme} &`]: {
        background: blackA.blackA3,
        transition:
          "background $transitions$durationDefault $transitions$functionDefault",
        ["-webkit-transition"]:
          "background $transitions$durationDefault $transitions$functionDefault",
      },
    },
  },

  "&:focus": {
    outline: "none",
  },

  "& button:focus": {
    outline: "2px solid $focus",
    transition:
      "outline $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "outline $transitions$durationDefault $transitions$functionDefault",
  },

  "&:active:not(:has(button:active))": {
    boxShadow: "$5",
    borderColor: "$focus",
    transition:
      "box-shadow $transitions$durationDefault $transitions$functionDefault, transform $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "box-shadow $transitions$durationDefault $transitions$functionDefault, transform $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
  },

  [`.${darkTheme} &`]: {
    background: whiteA.whiteA3,
    borderColor: whiteA.whiteA5,
    transition:
      "background $transitions$durationQuick $transitions$functionDefault, border-color $transitions$durationQuick $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationQuick $transitions$functionDefault, border-color $transitions$durationQuick $transitions$functionDefault",
  },

  [`.${darkTheme} &:has(a:focus)`]: {
    background: whiteA.whiteA3,
    borderColor: "$focus",
    transition:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
  },

  [`.${darkTheme} &:active:not(:has(button:active))`]: {
    background: whiteA.whiteA4,
    transition:
      "background $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault",
  },

  [`.${lightTheme} &`]: {
    background: whiteA.whiteA12,
    transition:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
  },

  [`.${lightTheme} &:has(a:focus)`]: {
    background: whiteA.whiteA1,
    borderColor: "$focus",
    transition:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
  },

  [`.${lightTheme} &:active:not(:has(button:active))`]: {
    background: whiteA.whiteA1,
    transition:
      "background $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault",
  },
});

export const StyledCardInner = styled(Box, {
  position: "relative",
});

export const StyledCardImage = styled(Image, {
  objectFit: "cover",
  filter: "brightness(85%)",

  // https://nextjs.org/docs/api-reference/next/image#known-browser-bugs
  "img[loading='lazy']": {
    clipPath: "inset(0.6px)",
  },
});

export const StyledBlogContent = styled(Box, {
  position: "relative",
  top: -16,
});

export const Card = memo(function Card({
  image,
  children,
  ...props
}: CardProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.ctrlKey) {
      linkRef.current.target = "_blank";
      linkRef.current.click();
      return;
    }

    if (e.shiftKey) {
      window.open(linkRef.current.href, "_blank");
      return;
    }

    linkRef.current.click();
  }, []);

  const handlePreviewToggle = useCallback((pressed: boolean) => {
    setIsPreviewVisible(pressed);
  }, []);

  const childProps: CardChildProps = useMemo(
    () => ({
      ref: linkRef,
      isPreviewVisible,
      onPreviewToggle: handlePreviewToggle,
    }),
    [isPreviewVisible, handlePreviewToggle]
  );

  return (
    <StyledCardOuter
      as="article"
      tabIndex={-1}
      onClick={handleClick}
      {...props}
    >
      <AspectRatio.Root ratio={16 / 9}>
        <StyledCardImage
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          src={image}
          alt=""
          sizes="(max-width: 768px) 100vw,
              (max-width: 1080px) 420px,
              330px"
          fill
        />
      </AspectRatio.Root>

      <StyledCardInner
        direction="vertical"
        spacingHorizontal={4}
        spacingBottom={4}
        flexGrow
      >
        {children(childProps)}
      </StyledCardInner>
    </StyledCardOuter>
  );
});

export const BlogCard = memo(function BlogCard({
  url,
  title,
  description,
  image,
  emoji,
  tags,
}: BlogCardProps) {
  return (
    <Card image={image}>
      {({ ref, isPreviewVisible, onPreviewToggle }) => (
        <>
          <StyledBlogContent direction="vertical" css={{ minHeight: 156 }}>
            <Emoji
              emoji={emoji}
              size="s"
              spacingBottom={4}
              css={{
                position: "relative",
                right: "$1",
              }}
            />

            <StyledLink href={url} ref={ref} variant="invisible">
              {isPreviewVisible ? (
                <TextAux as="p" clamp={4} textAlign="justify">
                  {description}
                </TextAux>
              ) : (
                <TextHeadline as="h3" id={url} clamp={3}>
                  {title}
                </TextHeadline>
              )}
            </StyledLink>
          </StyledBlogContent>

          <Box
            justifyContent="space-between"
            alignItems="center"
            css={{ marginTop: "auto" }}
          >
            <PostTags as="div" tags={tags} compact />

            <PreviewToggle
              aria-label="Toggle article preview"
              css={{
                "&:hover": {
                  cursor: "help",
                },
                "&::before": {
                  content: "",
                  width: 44,
                  height: 44,
                  background: "transparent",
                  position: "absolute",
                  zIndex: "$0",
                },
              }}
              pressed={isPreviewVisible}
              onPressedChange={onPreviewToggle}
            />
          </Box>
        </>
      )}
    </Card>
  );
});

export const BlogSponsored = memo(function BlogSponsored() {
  const sponsoredTag = {
    id: "sponsoredTag",
    name: "Sponsored",
    color: "default",
  };

  return (
    <Card image={banner}>
      {({ ref }) => (
        <>
          <StyledBlogContent direction="vertical" css={{ minHeight: 156 }}>
            <Emoji
              emoji="👋🏻"
              size="s"
              spacingBottom={4}
              css={{
                position: "relative",
                right: "$1",
              }}
            />

            <Box direction="vertical" gap={4}>
              <StyledLink href="/rss" ref={ref} variant="invisible">
                <TextHeadline id="rss" clamp={3} css={{ color: "$focus" }}>
                  Enjoying the blog?
                </TextHeadline>
              </StyledLink>

              <TextAux as="p" color="secondary">
                If you&apos;d like to support my work and stay up to date,
                consider following the RSS feed. You can also click the cup to
                buy me a coffee{" "}
                <TextAux aria-label="south-east arrow">↘️</TextAux>
              </TextAux>
            </Box>
          </StyledBlogContent>

          <Box
            justifyContent="space-between"
            alignItems="center"
            css={{ marginTop: "auto" }}
          >
            <PostTags as="div" tags={[sponsoredTag]} compact />

            <BuyMeCoffeeLink variant="button" />
          </Box>
        </>
      )}
    </Card>
  );
});

export const VideoCard = memo(function VideoCard({
  id,
  url,
  title,
  description,
  image,
  publishDate,
  channel,
  ...props
}: VideoCardProps) {
  const isLikedVideos = id === YOUTUBE_LIKED_VIDEOS_PLAYLIST_ID;

  return (
    <Card image={image} {...props}>
      {({ ref, isPreviewVisible, onPreviewToggle }) => (
        <Box
          direction="vertical"
          spacingTop={4}
          flexGrow
          css={{ minHeight: 156 }}
        >
          <StyledLink href={url} ref={ref} variant="invisible">
            {isPreviewVisible ? (
              <TextAux clamp={4} textAlign="justify">
                {description}
              </TextAux>
            ) : (
              <TextHeadline clamp={3}>{title}</TextHeadline>
            )}
          </StyledLink>

          <Box
            spacingTop={7}
            justifyContent="space-between"
            alignItems="center"
            css={{ marginTop: "auto" }}
          >
            {channel && isLikedVideos ? (
              <YoutubeChannel as="div" channel={channel} icon compact />
            ) : (
              <PublishDate as="div" date={publishDate} icon compact />
            )}

            {description ? (
              <PreviewToggle
                aria-label="Toggle article preview"
                css={{
                  "&::before": {
                    content: "",
                    width: 44,
                    height: 44,
                    background: "transparent",
                    position: "absolute",
                    zIndex: "$0",
                  },
                }}
                title="View description"
                pressed={isPreviewVisible}
                onPressedChange={onPreviewToggle}
              />
            ) : null}
          </Box>
        </Box>
      )}
    </Card>
  );
});
