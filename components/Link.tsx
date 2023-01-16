import { forwardRef, memo, Ref } from "react";
import NextLink from "next/link";
import { MdRssFeed } from "react-icons/md";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import {
  ArrowRightIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { TextAux, TextHeadline } from "./Text";
import {
  LinkProps,
  MarkdownLinkProps,
  RssLinkProps,
  TwitterLinkProps,
  YoutubeLinkProps,
} from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Layout";
import { ICON_SIZE } from "../util/images";

const StyledRssIcon = styled(MdRssFeed, {
  position: "relative",
  top: -1,
  left: 3,
});

export const StyledLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2",
  color: "inherit",
  textDecoration: "none",

  "&:hover": {
    color: "$blue11",
  },

  "&:active": {
    color: "$blue9",
  },

  variants: {
    variant: {
      primary: {
        color: "$blue10",
      },
      secondary: {
        color: "$gray12",
      },
      tertiary: {
        textDecoration: "underline",
        textDecorationStyle: "dotted",
      },
    },
  },
});

export const Link = memo(
  forwardRef(
    (
      { href, nextLinkProps, ...props }: LinkProps,
      ref: Ref<HTMLAnchorElement>
    ) => {
      const isInternal = isLinkInternal();

      function isLinkInternal() {
        const link = typeof href === "object" ? href.pathname : href;

        return link.charAt(0) === "/";
      }

      return (
        <NextLink
          href={href}
          target={!isInternal ? "_blank" : "_self"}
          rel={!isInternal ? "external noopener noreferrer" : ""}
          passHref
          legacyBehavior
          {...nextLinkProps}
        >
          <StyledLink ref={ref} {...props} />
        </NextLink>
      );
    }
  )
);

export const StyledIconLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  padding: "$2",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  minWidth: 44,
  minHeight: 44,
  boxShadow: "$1",

  "&:hover": {
    boxShadow: "$4",
    backgroundColor: "$foreground",
    color: "$background",
  },

  "&:active": {
    boxShadow: "$5",
  },

  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
        opacity: 0.4,
      },
    },
  },
});

export const StyledYoutubeSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      button: {
        padding: "$2 $4",
        backgroundColor: "$red8",
        borderRadius: 4,
        boxShadow: "$1",

        "&:hover": {
          boxShadow: "$4",
          backgroundColor: "$red7",
          color: "$white",
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
      link: {
        color: "inherit",
      },
      icon: {
        justifyContent: "center",
        borderRadius: "50%",
        padding: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: "$red8",
        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",

        "&:hover": {
          backgroundColor: "$red7",
          boxShadow: "$4",
          color: "$white",
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
    },
  },
});

export const StyledRssSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {
        color: "inherit",
      },
      button: {
        padding: "$2 $4",
        backgroundColor: "$amber11",
        borderRadius: 4,
        color: "black",
        boxShadow: "$1",
        "&:hover": {
          boxShadow: "$4",
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
      icon: {
        justifyContent: "center",
        borderRadius: "50%",
        padding: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "$foregroundMuted",
        backgroundColor: "$amber11",
        color: "white",
        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",
        "&:hover": {
          boxShadow: "$4",
        },

        "&:active": {
          boxShadow: "$5",
        },

        "& div": {
          position: "relative",
          right: 2,
        },
      },
    },
  },
});

export const StyledClearFilterLink = styled(Link, {
  position: "relative",
  padding: "$2",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  borderRadius: "50%",
  boxShadow: "$1",
  "&:hover": {
    boxShadow: "$4",
    background: "$foreground",
    color: "$background",
  },

  "&:active": {
    boxShadow: "$5",
  },
});

// 'Notion to Markdown' converts embeds to links
// Render embeds as iframes, and links with the custom Link component
export const MarkdownLink = memo(function MarkdownLink({
  node,
  ...props
}: MarkdownLinkProps) {
  const isEmbedLink = node.children[0].value === "embed";

  if (isEmbedLink) {
    const src =
      typeof props.href === "object" ? props.href.pathname : props.href;

    return <iframe src={src} width="100%" height="500px"></iframe>;
  }

  return <Link href={props.href} variant="tertiary" {...props} />;
});

export const YoutubeSubscribeLink = memo(function YoutubeSubscribeLink({
  type = "link",
  ...props
}: YoutubeLinkProps) {
  return (
    <StyledYoutubeSubscription
      href={YOUTUBE_SUBSCRIBE_URL}
      type={type}
      {...props}
    >
      <Box alignItems="center" gap={2}>
        <VideoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        {type === "button" && <TextAux color="primary">Subscribe</TextAux>}
        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}
      </Box>
    </StyledYoutubeSubscription>
  );
});

export const RssSubscribeLink = memo(function RssSubscribeLink({
  type = "link",
  ...props
}: RssLinkProps) {
  const rssFeedUrl = `${SITE.url}/rss`;

  return (
    <StyledRssSubscription href={rssFeedUrl} type={type} {...props}>
      <Box alignItems="center" gap={2}>
        <StyledRssIcon size={ICON_SIZE.l} />

        {type === "button" && <TextAux color="inherit">Subscribe</TextAux>}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}
      </Box>
    </StyledRssSubscription>
  );
});

export const TwitterShareLink = memo(function TwitterShareLink({
  url,
  text,
  emoji = "👀",
  variant = "default",
  ...props
}: TwitterLinkProps) {
  const formattedText = `${emoji} ${text}`;

  const formattedAuthor = `🙋‍♂️ ${SOCIAL.twitter.handle}`;

  const sanitisedText = encodeURIComponent(
    `${formattedText}\n\n${formattedAuthor}\n\n`
  );

  const sanitisedUrl = encodeURIComponent(url);

  const href = buildUrl("https://twitter.com/intent/tweet", {
    url: sanitisedUrl,
    text: sanitisedText,
  });

  if (variant === "icon") {
    return (
      <StyledIconLink href={href} title="Share on Twitter" {...props}>
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>
      </StyledIconLink>
    );
  }

  return (
    <Link href={href} title="Share on Twitter">
      <Box alignItems="center" gap={2}>
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <TextHeadline>Tweet</TextHeadline>
      </Box>
    </Link>
  );
});

export const ReadmoreLink = memo(function ReadMoreLink(props) {
  return (
    <Box gap={2} alignItems="center" {...props}>
      <TextAux>Read more</TextAux>
      <ArrowRightIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </Box>
  );
});
