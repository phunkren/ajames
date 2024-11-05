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
import {
  LikeCount,
  PostTags,
  PublishDate,
  ReplyCount,
  RepostCount,
  Retailer,
  YoutubeChannel,
} from "./Frontmatter";
import { Box } from "./Box";
import {
  Emoji,
  TextAux,
  TextBody,
  TextHeadline,
  TextTitle2,
  TextTitle3,
} from "./Text";
import { BuyMeCoffeeLink, Link, LinkPreview } from "./Link";
import { StyledTag } from "./Tags";
import { PreviewToggle } from "./Button";
import { BLUR_DATA_URL, ICON_SIZE } from "../util/images";
import { YOUTUBE_CHANNEL_TITLE } from "../util/youtube";
import { CSS } from "../stitches.config";
import { Tag } from "../util/notion";
import banner from "../public/images/banner.png";
import { Avatar } from "./Avatar";
import { getInitials } from "../util/atproto";
import { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { PlayIcon } from "@radix-ui/react-icons";

export type CardChildProps = {
  ref: Ref<HTMLAnchorElement>;
  isPreviewVisible: boolean;
  onPreviewToggle: (pressed: boolean) => void;
};

export type CardProps = {
  image?: string | StaticImageData;
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

export type InventoryCardProps = CSS & {
  id: string;
  retailer: string;
  title: string;
  url: string;
  image: string;
};

export type SocialCardProps = CSS & {
  id: string;
  author: ProfileViewBasic;
  text: string;
  replies: number;
  reposts: number;
  likes: number;
  images?: Record<string, unknown>[];
  video?: {
    src: string;
    img: string;
    aspectRatio: { width: number; height: number };
  };
  link?: string;
  compact?: boolean;
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

const StyledImage = styled(Image, {
  objectFit: "cover",
  pointerEvents: "none",
  width: "100%",
});

const StyledPlayIconContainer = styled(Box, {
  position: "absolute",
  top: "50%",
  left: "50%",
  color: "white",
  background: blackA.blackA10,
  transform: "translate(-50%, -50%)",
  borderWidth: 2,
  borderColor: "white",
  borderStyle: "solid",
  borderRadius: "50%",
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

  [`.${lightTheme} &`]: {
    background: whiteA.whiteA12,
    borderColor: blackA.blackA2,
    transition:
      "background $transitions$durationDefault $transitions$functionDefault",
    ["-webkit-transition"]:
      "background $transitions$durationDefault $transitions$functionDefault",
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
        background: blackA.blackA2,
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

const StyledSocialInteractions = styled(Box, {
  maxWidth: 400,
  width: "100%",
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
      {image ? (
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
      ) : null}

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
  ...props
}: BlogCardProps) {
  return (
    <Card image={image} {...props}>
      {({ ref, isPreviewVisible, onPreviewToggle }) => (
        <>
          <StyledBlogContent direction="vertical" css={{ minHeight: 180 }}>
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
                <TextBody as="p" clamp={4} textAlign="justify">
                  {description}
                </TextBody>
              ) : (
                <TextTitle3 as="h3" id={url} clamp={3}>
                  {title}
                </TextTitle3>
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
                <TextHeadline id="rss" clamp={3} color="focus">
                  Enjoying the blog?
                </TextHeadline>
              </StyledLink>

              <TextAux as="p" color="secondary">
                If you&apos;d like to support my work and stay up to date, click
                here to follow the RSS feed. You can also click the cup to buy
                me a coffee <TextAux aria-label="south-east arrow">↘️</TextAux>
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
  const isMyVideos = channel === YOUTUBE_CHANNEL_TITLE;

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
            {!isMyVideos ? (
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

export const InventoryCard = memo(function InventoryCard({
  id,
  url,
  retailer,
  title,
  image,
  affiliate,
  ...props
}: InventoryCardProps) {
  return (
    <Card image={image} {...props}>
      {({ ref }) => (
        <Box
          direction="vertical"
          spacingTop={4}
          flexGrow
          css={{ minHeight: 156 }}
        >
          <StyledLink href={url} ref={ref} variant="invisible">
            <TextHeadline clamp={3}>{title}</TextHeadline>
          </StyledLink>

          <Box
            spacingTop={7}
            justifyContent="space-between"
            alignItems="center"
            css={{ marginTop: "auto" }}
          >
            <Retailer as="div" name={retailer} icon compact />

            {affiliate ? (
              <StyledTag borderColor="red" compact>
                <TextAux>AFFILIATE</TextAux>
              </StyledTag>
            ) : null}
          </Box>
        </Box>
      )}
    </Card>
  );
});

export const SocialCard = memo(function SocialCard({
  id,
  author,
  replies,
  reposts,
  images,
  video,
  likes,
  link,
  url,
  text,
  compact,
  ...props
}: SocialCardProps) {
  const fallback = getInitials(author.displayName);

  if (compact) {
    return (
      <Card {...props}>
        {({ ref }) => (
          <Box direction="vertical" spacingTop={4} flexGrow>
            <Box direction="vertical" gap={4} flexGrow>
              <Box direction="horizontal" gap={4}>
                <Avatar
                  src={author.avatar}
                  alt={author.displayName}
                  fallback={fallback}
                  compact
                />

                <Box direction="vertical">
                  <TextHeadline as="h3">{author.displayName}</TextHeadline>
                  <TextAux>{author.handle}</TextAux>
                </Box>

                <StyledLink
                  href={url}
                  ref={ref}
                  variant="invisible"
                ></StyledLink>
              </Box>

              <Box spacingHorizontal={2} gap={4} direction="vertical">
                <TextAux lang="en" as="pre" css={{ whiteSpace: "pre-wrap" }}>
                  {text}
                </TextAux>

                {images?.length ? (
                  <AspectRatio.Root
                    ratio={
                      images[0]?.aspectRatio.width /
                      images[0]?.aspectRatio.height
                    }
                  >
                    <StyledImage
                      src={images[0]?.thumb}
                      alt={images[0]?.alt}
                      fill
                    />
                  </AspectRatio.Root>
                ) : null}

                {video ? (
                  <AspectRatio.Root
                    ratio={video?.aspectRatio.width / video?.aspectRatio.height}
                  >
                    <StyledImage src={video.img} alt="" fill />
                    <StyledPlayIconContainer spacing={3}>
                      <PlayIcon width={ICON_SIZE.xxl} height={ICON_SIZE.xxl} />
                    </StyledPlayIconContainer>
                  </AspectRatio.Root>
                ) : null}

                {link ? (
                  <LinkPreview
                    href={link.uri}
                    src={link.thumb}
                    title={link.title}
                    description={link.description}
                  />
                ) : null}
              </Box>

              <Box
                spacingHorizontal={2}
                justifyContent="flex-end"
                css={{ marginTop: "auto" }}
              >
                <StyledSocialInteractions justifyContent="space-between">
                  <ReplyCount total={replies} compact icon />
                  <RepostCount total={reposts} compact icon />
                  <LikeCount total={likes} compact icon />
                </StyledSocialInteractions>
              </Box>
            </Box>
          </Box>
        )}
      </Card>
    );
  }

  return (
    <Card display="block" {...props}>
      {({ ref }) => (
        <Box direction="vertical" spacing={7} flexGrow css={{ minHeight: 156 }}>
          <Box direction="vertical" gap={10}>
            <Box direction="horizontal" gap={10}>
              <Avatar
                src={author.avatar}
                alt={author.displayName}
                fallback={fallback}
              />

              <Box direction="vertical">
                <TextTitle2 as="h3">{author.displayName}</TextTitle2>
                <TextBody>{author.handle}</TextBody>
              </Box>

              <StyledLink href={url} ref={ref} variant="invisible"></StyledLink>
            </Box>

            <Box spacingHorizontal={2} direction="vertical">
              <TextBody
                as="pre"
                lang="en"
                css={{ width: "max-content", whiteSpace: "pre-wrap" }}
              >
                {text}
              </TextBody>

              {images?.length
                ? images.map((image) => (
                    <AspectRatio.Root
                      ratio={image.aspectRatio.width / image.aspectRatio.height}
                    >
                      <StyledImage
                        src={image.thumb}
                        sizes="(max-width: 1020px) 100vw, 50vw"
                        alt={image.alt}
                        fill
                      />
                    </AspectRatio.Root>
                  ))
                : null}
            </Box>

            <Box
              spacingHorizontal={2}
              justifyContent="flex-end"
              css={{ marginTop: "auto" }}
            >
              <StyledSocialInteractions justifyContent="space-between">
                <ReplyCount total={replies} icon />
                <RepostCount total={reposts} icon />
                <LikeCount total={likes} icon />
              </StyledSocialInteractions>
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
});
