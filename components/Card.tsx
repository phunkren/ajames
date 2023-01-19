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
import { Emoji, TextAux, TextHeadline, TextTitle3 } from "./Text";
import { Link } from "./Link";
import {
  BlogCardProps,
  CardChildProps,
  CardProps,
  VideoCardProps,
} from "../types/card";
import { PreviewToggle } from "./Button";
import { BLUR_DATA_URL } from "../util/images";

const StyledCardOuter = styled(Box, {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  minWidth: `calc(300px - $space$3)`,
  boxShadow: "$1",
  borderRadius: 4,
  overflow: "hidden",

  "& div[data-radix-aspect-ratio-wrapper]": {
    overflow: "hidden",
  },

  "&:hover": {
    boxShadow: "$4",

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
  },

  [`.${darkTheme} &:hover, .${darkTheme} &:has(a:focus)`]: {
    backgroundColor: whiteA.whiteA3,
  },

  [`.${darkTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: whiteA.whiteA4,
  },

  [`.${lightTheme} &`]: {
    backgroundColor: blackA.blackA2,
  },

  [`.${lightTheme} &:hover, .${lightTheme} &:has(a:focus)`]: {
    backgroundColor: blackA.blackA3,
  },

  [`.${lightTheme} &:active:not(:has(button:active))`]: {
    backgroundColor: blackA.blackA4,
  },
});

const StyledCardInner = styled(Box, {
  borderTop: 0,
  borderRight: 1,
  borderBottom: 1,
  borderLeft: 1,
  borderStyle: "solid",
  borderBottomRightRadius: 4,
  borderBottomLeftRadius: 4,
  borderColor: "$background",
  zIndex: 5,
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  filter: "brightness(90%)",
});

const StyledLink = styled(Link, {
  "&:hover": {
    color: "inherit",
  },

  "&:focus": {
    outline: "none",
  },
});

const StyledBlogContent = styled(Box, {
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
        <StyledImage
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
            css={{ minHeight: 155, "@bp2": { minHeight: 168 } }}
          >
            <Emoji
              emoji={emoji}
              css={{
                spacingBottom: "$4",
                position: "relative",
                right: "$1",
              }}
            />

            <StyledLink href={url} ref={ref}>
              {isPreviewVisible ? (
                <TextAux clamp={4} css={{ lineHeight: 1.75 }}>
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
          css={{ minHeight: 155, "@bp2": { minHeight: 168 } }}
        >
          <StyledLink href={url} ref={ref}>
            {isPreviewVisible ? (
              <TextAux clamp={4}>{description}</TextAux>
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
