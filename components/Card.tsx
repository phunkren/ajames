import { ReactNode, Ref, useRef } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import { CSS, styled } from "../stitches.config";
import { PostTags, PublishDate, ReadingTime } from "./Frontmatter";
import { Box } from "./Layout";
import { Emoji, TextAux, TextBody, TextTitle3 } from "./Text";
import { blackA } from "@radix-ui/colors";
import { H3_STYLES } from "../styles/text";
import { Link } from "./Link";
import { Tag } from "../types/notion";

type ChildProps = {
  ref: Ref<HTMLAnchorElement>;
};

type CardProps = CSS & {
  image: string;
  children: (props: ChildProps) => ReactNode;
};

type BlogCardProps = CSS & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  emoji: string;
  readingTime: number;
  tags: Tag[];
};

type VideoCardProps = CSS & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  description?: string;
  css: any;
};

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
        spacingHorizontal={3}
        spacingBottom={3}
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
  image,
  emoji,
  tags,
  publishDate,
  readingTime,
}: BlogCardProps) {
  return (
    <Card image={image}>
      {({ ref }) => (
        <>
          <StyledBlogContent direction="vertical">
            <Emoji emoji={emoji} css={{ ...H3_STYLES }} />
            <StyledLink href={url} ref={ref}>
              <TextAux id={url}>
                <Balancer>{title}</Balancer>
              </TextAux>
            </StyledLink>
          </StyledBlogContent>

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
        </>
      )}
    </Card>
  );
}

export function VideoCard({
  url,
  title,
  image,
  description,
  publishDate,
  ...props
}: VideoCardProps) {
  return (
    <Card image={image} {...props}>
      {({ ref }) => (
        <Box direction="vertical" spacingTop={3}>
          <StyledLink href={url} ref={ref} variant="secondary">
            <TextAux>
              <Balancer>{title}</Balancer>
            </TextAux>
          </StyledLink>

          {description ? <TextBody>{description}</TextBody> : null}

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
