import { forwardRef, memo, Ref } from "react";
import NextLink from "next/link";
import { MdRssFeed } from "react-icons/md";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_CHANNEL_TITLE, YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import { BellIcon, TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { TextAux, TextHeadline } from "./Text";
import { LinkProps } from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Box";
import { ICON_SIZE } from "../util/images";

type TwitterShareProps = {
  url: string;
  text: string;
  emoji?: string;
  variant?: "default" | "icon";
};

type SubscribeProps = CSS & {
  type?: "link" | "icon" | "button";
};

const StyledLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2",
  color: "inherit",
  textDecorationLine: "none",
  textUnderlineOffset: "$space$1",
  transition: "color 75ms ease-out",

  "&[aria-current='page']": {
    color: "$blue11",
    textDecorationLine: "underline",
  },

  "@print": {
    textDecorationLine: "none !important",
  },

  variants: {
    variant: {
      primary: {
        color: "unset",
        backgroundImage: `linear-gradient(90deg, $blue11 0.04%, $blue9 100.04%)`,
        backgroundClip: "text",
        ["-webkit-text-fill-color"]: "transparent",

        "&:hover": {
          textDecorationLine: "underline",
          textDecorationColor: "unset",
        },

        "&:active": {
          color: "$blue9",
        },

        "@print": {
          color: "black ",
          backgroundImage: "none",
          backgroundClip: "border-box",
          ["-webkit-text-fill-color"]: "currentcolor",
        },
      },
      secondary: {
        "&:hover": {
          textDecorationColor: "$blue10",
          textDecorationLine: "underline",
        },
      },
      tertiary: {
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",

        "&:hover": {
          color: "inherit",
          textDecorationStyle: "solid",
          textDecorationColor: "$blue10",
        },

        "&:active": {
          color: "$blue9",
        },
      },
      invisible: {
        color: "inherit",
        textDecorationLine: "none",

        "&:hover": {
          color: "inherit",
          textDecorationLine: "none",
        },

        "&:active": {
          color: "inherit",
          textDecorationLine: "none",
        },
      },
      icon: {
        color: "inherit",

        "&:hover": {
          color: "$blue10",
        },
      },
    },
  },

  defaultVariants: {
    variant: "secondary",
  },
});

export const Link = memo(
  forwardRef(function Link(
    { href, nextLinkProps, ...props }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) {
    const isInternal = isLinkInternal();

    function isLinkInternal() {
      let link = typeof href === "object" ? href.pathname : href;
      return link.charAt(0) === "/";
    }

    return (
      <NextLink href={href} passHref legacyBehavior {...nextLinkProps}>
        <StyledLink
          ref={ref}
          target={!isInternal ? "_blank" : "_self"}
          rel={!isInternal ? "external noopener noreferrer" : ""}
          {...props}
        />
      </NextLink>
    );
  })
);

export const StyledIconLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  spacing: "$2",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  minWidth: 44,
  minHeight: 44,
  boxShadow: "$1",
  transition: "background 100ms ease-out, box-shadow 100ms ease-out",

  "&:hover": {
    boxShadow: "$4",
    borderColor: "$foreground",
    backgroundColor: "$foreground",
    color: "$background",

    "& svg": {
      color: "$background",
    },
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

const StyledYoutubeSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      button: {
        padding: "$2 $4",
        color: "white",
        borderRadius: 4,
        boxShadow: "$1",
        transition: "background 100ms ease-out, boxShadow 100ms ease-out",

        [`.${lightTheme} &`]: {
          backgroundColor: "$red9",
        },

        [`.${darkTheme} &`]: {
          backgroundColor: "$red8",
        },

        "&:hover": {
          boxShadow: "$4",
          color: "white",
          textDecoration: "none",

          [`.${lightTheme} &`]: {
            backgroundColor: "$red10",
            color: "white",
          },

          [`.${darkTheme} &`]: {
            backgroundColor: "$red7",
            color: "white",
          },
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
        spacing: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "$foreground",
        color: "white",
        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundColor: "$red9",
          borderColor: "$red9",
        },

        [`.${darkTheme} &`]: {
          backgroundColor: "$red8",
          borderColor: "$red8",
        },

        "&:hover": {
          boxShadow: "$4",

          [`.${lightTheme} &`]: {
            backgroundColor: "$red9",
            borderColor: "$red9",
          },

          [`.${darkTheme} &`]: {
            backgroundColor: "$red8",
            borderColor: "$red8",
          },
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
    },
  },
});

const StyledBlogSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {
        color: "inherit",
      },
      button: {
        padding: "$2 $4",
        borderRadius: 4,
        color: "white",
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundColor: "$blue11",
        },

        [`.${darkTheme} &`]: {
          backgroundColor: "$sky8",
        },

        "&:hover": {
          boxShadow: "$4",
          color: "white",
          textDecorationLine: "none",

          [`.${lightTheme} &`]: {
            backgroundColor: "$blue10",
          },

          [`.${darkTheme} &`]: {
            backgroundColor: "$sky7",
          },
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
      icon: {
        justifyContent: "center",
        borderRadius: "50%",
        spacing: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "$foreground",
        color: "white",
        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundColor: "$blue11",
          borderColor: "$blue11",
        },

        [`.${darkTheme} &`]: {
          backgroundColor: "$sky8",
          borderColor: "$sky8",
        },

        "&:hover": {
          boxShadow: "$4",

          color: "white",

          [`.${lightTheme} &`]: {
            backgroundColor: "$blue10",
            borderColor: "$blue10",
          },

          [`.${darkTheme} &`]: {
            backgroundColor: "$sky7",
            borderColor: "$sky7",
          },
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

const StyledRssIcon = styled(MdRssFeed, {
  position: "relative",
  top: -1,
  left: 3,
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
}: any) {
  const isEmbedLink = node.children[0].value === "embed";

  if (isEmbedLink) {
    return <iframe src={props.href} width="100%" height="500px"></iframe>;
  }

  return <Link href={props.href} variant="tertiary" {...props} />;
});

export const YoutubeSubscribeLink = memo(function YoutubeSubscribeLink({
  type = "link",
  ...props
}: SubscribeProps) {
  return (
    <StyledYoutubeSubscription
      href={YOUTUBE_SUBSCRIBE_URL}
      type={type}
      variant={type === "button" ? "invisible" : "secondary"}
      title={`Subscribe to ${YOUTUBE_CHANNEL_TITLE}`}
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

export const BlogSubscriptionLink = memo(function BlogSubscribeLink({
  type = "link",
  ...props
}: SubscribeProps) {
  const rssFeedUrl = `${SITE.url}/rss`;

  return (
    <StyledBlogSubscription
      href={rssFeedUrl}
      type={type}
      variant="secondary"
      {...props}
    >
      <Box alignItems="center" gap={2}>
        <StyledRssIcon size={ICON_SIZE.m} />

        {type === "button" && <TextAux color="inherit">Subscribe</TextAux>}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}
      </Box>
    </StyledBlogSubscription>
  );
});

export const TwitterShareLink = memo(function TwitterShareLink({
  url,
  text,
  emoji = "👀",
  variant = "default",
}: TwitterShareProps) {
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
      <StyledIconLink href={href} title="Share on Twitter" variant="icon">
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>
      </StyledIconLink>
    );
  }

  return (
    <StyledLink href={href} title="Share on Twitter" variant="secondary">
      <Box alignItems="center" gap={2}>
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <TextHeadline>Tweet</TextHeadline>
      </Box>
    </StyledLink>
  );
});
