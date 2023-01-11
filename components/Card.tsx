import { useRef, useState } from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blackA } from "@radix-ui/colors";
import { styled } from "../stitches.config";
import { PostTags, PublishDate } from "./Frontmatter";
import { Box } from "./Layout";
import { Emoji, TextAux, TextTitle3 } from "./Text";
import { Link } from "./Link";
import { BlogCardProps, CardProps, VideoCardProps } from "../types/card";
import { PreviewToggle } from "./Button";

const StyledCardOuter = styled(Box, {
  display: "flex",
  flexDirection: "column",
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
  cursor: "pointer",
  minWidth: `calc(300px - $space$3)`,
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
  backgroundColor: "$backgroundMuted",
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
});

const StyledLink = styled(Link, {});

const StyledBlogContent = styled(Box, {
  position: "relative",
  top: -16,
});

export function Card({ image, children, ...props }: CardProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const childProps = {
    ref: linkRef,
  };

  function handleClick() {
    linkRef.current.click();
  }

  return (
    <StyledCardOuter
      as="article"
      tabIndex={-1}
      onClick={handleClick}
      {...props}
    >
      <AspectRatio.Root ratio={16 / 9}>
        <StyledImage
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
}

export function BlogCard({
  url,
  title,
  description,
  image,
  emoji,
  tags,
}: BlogCardProps) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  function handlePreviewToggle(pressed: boolean) {
    setIsPreviewVisible(pressed);
  }

  return (
    <Card image={image}>
      {({ ref }) => (
        <>
          <StyledBlogContent
            direction="vertical"
            css={{ minHeight: 155, "@bp2": { minHeight: 168 } }}
          >
            <Emoji
              emoji={emoji}
              css={{
                zIndex: 1,
                spacingBottom: "$4",
                position: "relative",
                right: "$1",
              }}
            />

            <StyledLink href={url} ref={ref}>
              {isPreviewVisible ? (
                <TextAux
                  css={{
                    lineHeight: 1.75,
                    display: "-webkit-box",
                    ["-webkit-line-clamp"]: "3",
                    ["-webkit-box-orient"]: "vertical",
                    overflow: "hidden",
                    textTransform: "capitalize",

                    "@bp2": {
                      ["-webkit-line-clamp"]: "4",
                    },
                  }}
                >
                  {description}
                </TextAux>
              ) : (
                <TextTitle3
                  id={url}
                  css={{
                    display: "-webkit-box",
                    ["-webkit-line-clamp"]: "3",
                    ["-webkit-box-orient"]: "vertical",
                    overflow: "hidden",
                  }}
                >
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
              onPressedChange={handlePreviewToggle}
            />
          </Box>
        </>
      )}
    </Card>
  );
}

export function VideoCard({
  url,
  title,
  image,
  publishDate,
  ...props
}: VideoCardProps) {
  return (
    <Card image={image} {...props}>
      {({ ref }) => (
        <Box direction="vertical" spacingTop={3} flexGrow>
          <StyledLink href={url} ref={ref} variant="secondary">
            <TextAux
              css={{
                display: "-webkit-box",
                ["-webkit-line-clamp"]: "3",
                ["-webkit-box-orient"]: "vertical",
                overflow: "hidden",
              }}
            >
              {title}
            </TextAux>
          </StyledLink>

          <Box spacingTop={7} css={{ marginTop: "auto" }}>
            <PublishDate date={publishDate} icon />
          </Box>
        </Box>
      )}
    </Card>
  );
}
