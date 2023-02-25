import { forwardRef, memo, Ref } from "react";
import NextLink from "next/link";
import { MdRssFeed } from "react-icons/md";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import {
  DownloadIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
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
  width: "fit-content",

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
        backgroundImage: `linear-gradient(90deg, $blue11 0.04%, $hover 100.04%)`,
        backgroundClip: "text",
        ["-webkit-text-fill-color"]: "transparent",

        "@media(hover)": {
          "&:hover": {
            textDecorationLine: "underline",
            textDecorationColor: "$hover",

            /** React Balancer */
            "& span": {
              display: "flex !important",
            },
          },
        },

        "@print": {
          color: "black ",
          backgroundImage: "none",
          backgroundClip: "border-box",
          ["-webkit-text-fill-color"]: "currentcolor",
        },
      },
      secondary: {
        "@media(hover)": {
          "&:hover": {
            color: "unset",
            backgroundImage: `linear-gradient(90deg, $blue11 0.04%, $hover 100.04%)`,
            backgroundClip: "text",
            ["-webkit-text-fill-color"]: "transparent",
          },

          "&:hover svg": {
            color: "$hover",
          },
        },
      },
      tertiary: {
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",

        "@media(hover)": {
          "&:hover": {
            color: "inherit",
            textDecorationStyle: "solid",
            textDecorationColor: "$hover",
          },
        },
      },
      invisible: {
        color: "inherit",

        "@media(hover)": {
          "&:hover": {
            color: "inherit",
          },
        },

        "&:active": {
          color: "inherit",
        },
      },
      icon: {
        minWidth: 44,
        minHeight: 44,
        alignItems: "center",
        justifyContent: "center",
        color: "inherit",

        "@media(hover)": {
          "&:hover": {
            color: "$hover",
          },
        },
      },
    },
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
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  minWidth: 44,
  minHeight: 44,
  boxShadow: "$1",
  transition: "background 100ms ease-out, box-shadow 100ms ease-out",

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
      borderColor: "$foreground",
      backgroundColor: "$foreground",
      color: "$background",

      "& svg": {
        color: "$background",
      },
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
  transition: "boxShadow 100ms ease-out",

  variants: {
    type: {
      button: {
        padding: "$2 $4",
        borderRadius: "$1",
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $red11 0.04%, $red10 100.04%)`,
          color: "$red1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $red8 0.04%, $red7 100.04%)`,
          color: "$red12",
        },

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",

            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $red10 0.04%, $red10 100.04%)`,
              color: "$red1",
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $red7 0.04%, $red7 100.04%)`,
              color: "$red12",
            },
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
          backgroundImage: `linear-gradient(185deg, $red11 0.04%, $red10 100.04%)`,
          borderColor: "$red10",
          color: "$red1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $red8 0.04%, $red7 100.04%)`,
          borderColor: "$red7",
          color: "$red12",
        },

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",

            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $red10 0.04%, $red10 100.04%)`,
              borderColor: "$red10",
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $red7 0.04%, $red7 100.04%)`,
              borderColor: "$red7",
            },
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
  transition: "boxShadow 100ms ease-out",

  variants: {
    type: {
      link: {
        color: "inherit",
      },
      button: {
        padding: "$2 $4",
        borderRadius: "$1",
        color: "$blue1",
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $blue11 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $blue8 0.04%, $blue7 100.04%)`,
          color: "$blue12",
        },

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",

            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $blue10 0.04%, $blue10 100.04%)`,
              color: "$blue1",
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $blue8 0.04%, $blue8 100.04%)`,
              color: "$blue12",
            },
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

        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $blue10 0.04%, $hover 100.04%)`,
          borderColor: "$hover",
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $hover 0.04%, $blue8 100.04%)`,
          borderColor: "$blue8",
          color: "$blue12",
        },

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",

            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(-90deg, $hover 0.04%, $hover 100.04%)`,
              borderColor: "$hover",
              color: "$blue1",
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(225deg, $blue8 0.04%, $blue8 100.04%)`,
              borderColor: "$blue8",
              color: "$blue12",
            },
          },
        },

        "&:active": {
          boxShadow: "$5",
        },

        /** Optically aligns the RSS Icon */
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

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
      background: "$foreground",
      color: "$background",
    },

    "&:active": {
      boxShadow: "$5",
    },
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
      variant={type === "link" ? "secondary" : "invisible"}
      {...props}
    >
      <Box alignItems="center" gap={2}>
        <VideoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />

        {type === "button" && <TextAux color="primary">Subscribe</TextAux>}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}

        {type === "icon" && (
          <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>
        )}
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
      variant={type === "link" ? "secondary" : "invisible"}
      {...props}
    >
      <Box alignItems="center" gap={2}>
        <StyledRssIcon size={ICON_SIZE.m} />

        {type === "button" && <TextAux color="inherit">Subscribe</TextAux>}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}

        {type === "icon" && (
          <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>
        )}
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
    <StyledLink href={href} variant="secondary">
      <Box alignItems="center" gap={2}>
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <TextHeadline>Tweet</TextHeadline>
      </Box>
    </StyledLink>
  );
});

export const DownloadLink = memo(function DownloadLink(props: any) {
  return (
    <StyledIconLink title="Download" download {...props}>
      <DownloadIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
      <VisuallyHidden.Root>Download</VisuallyHidden.Root>
    </StyledIconLink>
  );
});
