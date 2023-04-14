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
import { Emoji, TextAux, TextBody, TextHeadline, TextTitle3 } from "./Text";
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
  borderWidth: 2,
  borderStyle: "solid",
  overflow: "hidden",
  willChange: "transform",
  transition:
    "background 200ms ease-out, boxShadow 200ms ease-out, transform 200ms ease-out",

  "& div[data-radix-aspect-ratio-wrapper]": {
    overflow: "hidden",
  },

  "@media(hover)": {
    "&:hover:not(:has(button:hover))": {
      boxShadow: "$4",
      borderColor: "$hover",

      "& img": {
        filter: "brightness(95%)",
      },
    },
    [`.${darkTheme} &:hover`]: {
      backgroundColor: whiteA.whiteA3,
    },

    [`.${lightTheme} &:hover`]: {
      backgroundColor: blackA.blackA2,
    },
  },

  "&:focus": {
    outline: "none",
  },

  "& button:focus": {
    outline: "2px solid $focus",
    outlineOffset: 2,
  },

  "&:active:not(:has(button:active))": {
    boxShadow: "$5",
    transform: "scale(0.99)",
    borderColor: "$focus",

    "& img": {
      filter: "brightness(100%)",
    },
  },

  [`.${darkTheme} &`]: {
    backgroundColor: whiteA.whiteA2,
    borderColor: whiteA.whiteA5,
  },

  [`.${darkTheme} &:has(a:focus)`]: {
    backgroundColor: whiteA.whiteA3,
    borderColor: "$focus",
    outline: "none",
  },

  [`.${darkTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: whiteA.whiteA4,
  },

  [`.${lightTheme} &`]: {
    backgroundColor: blackA.blackA1,
    borderColor: whiteA.whiteA4,
  },

  [`.${lightTheme} &:has(a:focus)`]: {
    backgroundColor: whiteA.whiteA3,
    borderColor: "$focus",
    outline: "none",
  },

  [`.${lightTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: blackA.blackA3,
  },
});

export const StyledCardInner = styled(Box, {
  position: "relative",
});

export const StyledCardImage = styled(Image, {
  objectFit: "cover",
  filter: "brightness(85%)",
  transition: "filter 200ms ease-out",

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
                  zIndex: 0,
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
                You can support my work by clicking here and following the RSS
                feed. Alternatively, click the cup icon below to buy me a
                coffee.
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
                    zIndex: 0,
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
