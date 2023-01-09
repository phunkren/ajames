import { useRef } from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blackA } from "@radix-ui/colors";
import { styled } from "../stitches.config";
import { PostTags, PublishDate } from "./Frontmatter";
import { Box } from "./Layout";
import { Emoji, TextAux, TextTitle3 } from "./Text";
import { H3_STYLES } from "../styles/text";
import { Link } from "./Link";
import { BlogCardProps, CardProps, VideoCardProps } from "../types/card";

const StyledCardOuter = styled(Box, {
  display: "flex",
  flexDirection: "column",
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
  cursor: "pointer",
  minWidth: `calc(300px - $space$3)`,

  "&:focus-within": {
    outline: "10px solid red",
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
  borderColor: blackA.blackA10,
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
});

const StyledLink = styled(Link, {
  "&:focus": {
    outline: "none",
  },
});

const StyledBlogContent = styled(Box, {
  position: "relative",
  top: -13,

  "@bp2": {
    top: -15,
  },

  "@bp3": {
    top: -18,
  },
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

export function BlogCard({ url, title, image, emoji, tags }: BlogCardProps) {
  return (
    <Card image={image}>
      {({ ref }) => (
        <>
          <StyledBlogContent direction="vertical">
            <Emoji emoji={emoji} css={{ ...H3_STYLES }} />
            <StyledLink href={url} ref={ref}>
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
            </StyledLink>
          </StyledBlogContent>

          <Box direction="vertical" css={{ marginTop: "auto" }}>
            <PostTags tags={tags} />
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

          <Box
            as="ul"
            justifyContent="space-between"
            gap={4}
            spacingTop={7}
            css={{ marginTop: "auto" }}
          >
            <PublishDate as="li" date={publishDate} icon />
          </Box>
        </Box>
      )}
    </Card>
  );
}
