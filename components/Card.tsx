import { useRef } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { styled } from "../stitches.config";
import { PostTags, PublishDate, ReadingTime } from "./Frontmatter";
import { Box } from "./Layout";
import { Emoji, TextTitle3 } from "./Text";
import { blackA } from "@radix-ui/colors";
import { H3_STYLES } from "../styles/text";
import { Link } from "./Link";

const StyledCardOuter = styled(Box, {
  display: "flex",
  flexDirection: "column",
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
  cursor: "pointer",

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

const StyledContent = styled(Box, {
  position: "relative",
  top: -13,

  "@bp2": {
    top: -15,
  },

  "@bp3": {
    top: -18,
  },
});

export function Card({
  url,
  image,
  emoji,
  title,
  publishDate,
  readingTime,
  tags,
}) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  function handleClick() {
    linkRef.current.click();
  }

  return (
    <StyledCardOuter as="article" tabIndex={-1} onClick={handleClick}>
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
        spacingHorizontal={3}
        spacingBottom={3}
        flexGrow
      >
        <StyledContent direction="vertical">
          <Emoji emoji={emoji} css={{ ...H3_STYLES }} />
          <StyledLink href={url} ref={linkRef}>
            <TextTitle3 as="h2" id={url}>
              <Balancer>{title}</Balancer>
            </TextTitle3>
          </StyledLink>
        </StyledContent>

        <PostTags tags={tags} />

        <Box
          as="ul"
          justifyContent="space-between"
          gap={4}
          spacingTop={7}
          css={{ marginTop: "auto" }}
        >
          <PublishDate as="li" date={publishDate} icon />
          <ReadingTime as="li" time={readingTime} icon />
        </Box>
      </StyledCardInner>
    </StyledCardOuter>
  );
}
