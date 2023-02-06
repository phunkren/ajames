import {
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blackA, whiteA } from "@radix-ui/colors";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { PostTags, PublishDate } from "./Frontmatter";
import { Box } from "./Box";
import { Emoji, TextAux, TextBody, TextHeadline, TextTitle3 } from "./Text";
import { Link } from "./Link";
import {
  BlogCardProps,
  CardChildProps,
  CardProps,
  VideoCardProps,
} from "../types/card";
import { PreviewToggle } from "./Button";
import { BLUR_DATA_URL } from "../util/images";

const StyledLink = styled(Link, {
  "&:hover": {
    color: "inherit",
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
  minWidth: `calc(300px - $space$3)`,
  boxShadow: "$1",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  overflow: "hidden",
  transition:
    "background 200ms ease-out, boxShadow 200ms ease-out, transform 200ms ease-out",

  "&::after": {
    content: "",
    position: "absolute",
    height: 2,
    width: "calc(100% + 2px)",
    bottom: 0,
    left: -1,
    background: "transparent",
    transition: "background 200ms ease-out",
  },

  "& div[data-radix-aspect-ratio-wrapper]": {
    overflow: "hidden",
  },

  "&:hover:not(:has(button:hover))": {
    boxShadow: "$4",

    "&::after": {
      background: "$blue10",
    },

    "& img": {
      filter: "brightness(95%)",
    },
  },

  "&:active:not(:has(button:active))": {
    boxShadow: "$5",
    transform: "scale(0.99)",

    "& img": {
      filter: "brightness(100%)",
    },
  },

  [`.${darkTheme} &`]: {
    backgroundColor: whiteA.whiteA2,
    borderColor: whiteA.whiteA5,
  },

  [`.${darkTheme} &:hover, .${darkTheme} &:has(a:focus)`]: {
    backgroundColor: whiteA.whiteA3,
  },

  [`.${darkTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: whiteA.whiteA4,
  },

  [`.${lightTheme} &`]: {
    backgroundColor: blackA.blackA1,
    borderColor: whiteA.whiteA4,
  },

  [`.${lightTheme} &:hover, .${lightTheme} &:has(a:focus)`]: {
    backgroundColor: blackA.blackA2,
  },

  [`.${lightTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: blackA.blackA3,
  },
});

export const StyledCardInner = styled(Box, {
  zIndex: 5,
});

export const StyledCardImage = styled(Image, {
  objectFit: "cover",
  filter: "brightness(90%)",
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
              (max-width: 1200px) 50vw,
              33vw"
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
          <StyledBlogContent
            direction="vertical"
            css={{ minHeight: 156, "@bp2": { minHeight: 140 } }}
          >
            <Emoji
              emoji={emoji}
              size="s"
              css={{
                spacingBottom: "$4",
                position: "relative",
                right: "$1",
              }}
            />

            <StyledLink href={url} ref={ref} variant="invisible">
              {isPreviewVisible ? (
                <TextAux clamp={4} textAlign="justify">
                  {description}
                </TextAux>
              ) : (
                <TextTitle3 id={url} clamp={3}>
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
            <PostTags tags={tags} />

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
              title="View description"
              pressed={isPreviewVisible}
              onPressedChange={onPreviewToggle}
            />
          </Box>
        </>
      )}
    </Card>
  );
});

export const VideoCard = memo(function VideoCard({
  url,
  title,
  description,
  image,
  publishDate,
  ...props
}: VideoCardProps) {
  return (
    <Card image={image} {...props}>
      {({ ref, isPreviewVisible, onPreviewToggle }) => (
        <Box
          direction="vertical"
          spacingTop={4}
          flexGrow
          css={{ minHeight: 156, "@bp2": { minHeight: 140 } }}
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
            <PublishDate date={publishDate} icon compact />

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
