import {
  forwardRef,
  memo,
  Ref,
  AnchorHTMLAttributes,
  useCallback,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import Image from "next/image";
import { UrlObject } from "url";
import { MdRssFeed } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import {
  DownloadIcon,
  LinkedInLogoIcon,
  NotionLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { PiButterfly as BlueskyLogoIcon } from "react-icons/pi";
import { RiTwitterXLine as XLogoIcon } from "react-icons/ri";
import {
  css,
  CSS,
  darkTheme,
  keyframes,
  lightTheme,
  styled,
} from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import { buildUrl } from "../util/url";
import { ICON_SIZE } from "../util/images";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";
import { TextAux, TextHeadline } from "./Text";
import { StyledCoffeeButton } from "./Button";

import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blackA, whiteA } from "@radix-ui/colors";

export type LinkProps = CSS &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string | UrlObject;
    nextLinkProps?: Omit<NextLinkProps, "href">;
    variant?: "primary" | "secondary";
  };

type XShareProps = {
  url: string;
  text: string;
  emoji?: string;
  variant?: "default" | "icon";
};

type BlueskyShareProps = {
  url: string;
  text: string;
  emoji?: string;
  variant?: "default" | "icon";
};

type SubscribeProps = CSS & {
  type?: "link" | "icon" | "button";
};

type NotionViewProps = CSS & {
  id: string;
  type?: "link" | "icon" | "button";
};

type CoffeeProps = CSS & {
  variant?: "button" | "text";
  icon?: boolean;
};

type LinkPreviewProps = {
  href: string;
  src: string;
  title: string;
  description: string;
};

const LINK_BUTTON_PROPS = {
  boxShadow: "$1",
  transition: `box-shadow $transitions$durationQuick $transitions$functionDefault, transform $transitions$durationQuick $transitions$functionDefault`,
  ["-webkit-transition"]: `box-shadow $transitions$durationQuick $transitions$functionDefault, transform $transitions$durationQuick $transitions$functionDefault`,

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
      transition: `box-shadow $transitions$durationDefault $transitions$functionDefault`,
      ["-webkit-transition"]: `box-shadow $transitions$durationDefault $transitions$functionDefault`,
    },
  },

  "&:active": {
    boxShadow: "$5",
    transition: `transform $transitions$durationDefault $transitions$functionDefault`,
    ["-webkit-transition"]: `transform $transitions$durationDefault $transitions$functionDefault`,
  },
};

const secondaryFade = keyframes({
  "0%": { color: "currentcolor" },
  "50%": { color: "$hover" },
  "100%": {
    color: "unset",
    backgroundImage: `linear-gradient(90deg, $blue11 0.04%, $hover 100.04%)`,
    backgroundClip: "text",
    ["-webkit-text-fill-color"]: "transparent",
  },
});

const flutter = keyframes({
  "10%": {
    transform: "scale(calc(var(--flip) * 1), 0.9)",
  },
  "20%": {
    transform: "scale(calc(var(--flip) * 0.5), 1)",
  },
  "40%": {
    transform: "scale(calc(var(--flip) * 0.9), 0.95)",
  },
  "60%": {
    transform: "scale(calc(var(--flip) * 0.3), 1)",
  },
  "80%": {
    transform: "scale(calc(var(--flip) * 0.9), 0.95)",
  },
  "100%": {
    transform: "scale(calc(var(--flip) * 1), 1)",
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  pointerEvents: "none",
});

const StyledPreviewLinkContainer = styled(Box, {
  borderRadius: "$1",
  borderColor: "transparent",
  borderWidth: 2,
  borderStyle: "solid",
  overflow: "hidden",
  width: "100%",

  [`.${darkTheme} &`]: {
    borderColor: whiteA.whiteA5,
    background: whiteA.whiteA4,
  },

  [`.${lightTheme} &`]: {
    borderColor: blackA.blackA5,
    background: blackA.blackA4,
  },
});

const StyledLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2",
  color: "currentcolor",
  textDecorationLine: "none",
  textUnderlineOffset: "$space$1",

  "& svg": {
    color: "currentcolor",
  },

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
        transition: `text-decoration-color $transitions$durationQuick $transitions$functionDefault`,
        ["-webkit-transition"]: `text-decoration-color $transitions$durationQuick $transitions$functionDefault`,
        ["-webkit-text-fill-color"]: "transparent",

        textDecorationLine: "underline",

        "@media(hover)": {
          "&:hover": {
            textDecorationColor: "$hover",
            transition: `text-decoration-color $transitions$durationDefault $transitions$functionDefault`,
            ["-webkit-transition"]: `text-decoration-color $transitions$durationDefault $transitions$functionDefault`,

            /** React Balancer */
            "& span": {
              display: "flex !important",
            },
          },
        },

        "@print": {
          color: "black",
          backgroundImage: "none",
          backgroundClip: "border-box",
          ["-webkit-text-fill-color"]: "currentcolor",
        },
      },
      secondary: {
        "@media(hover)": {
          "&:not([aria-current='page']):hover": {
            animation: `${secondaryFade} $transitions$durationDefault $transitions$functionDefault forwards`,
          },

          "&:hover svg": {
            color: "$hover",
            fill: "$hover",
            transition:
              "color $transitions$durationDefault $transitions$functionDefault",
          },
        },
      },
      tertiary: {
        textDecorationLine: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "currentcolor",
        transition: `text-decoration-color $transitions$durationQuick $transitions$functionDefault`,

        "& svg": {
          fill: "currentcolor",
          transition: `fill $transitions$durationQuick $transitions$functionDefault`,
        },

        "@media(hover)": {
          "&:hover": {
            color: "inherit",
            textDecorationStyle: "solid",
            textDecorationColor: "$hover",
            transition: `text-decoration-color $transitions$durationDefault $transitions$functionDefault`,
          },
        },
      },
      invisible: {
        color: "currentcolor",

        "@media(hover)": {
          "&:hover": {
            color: "currentcolor",
          },
        },

        "&:active": {
          color: "currentcolor",
        },
      },
      icon: {
        minWidth: 44,
        minHeight: 44,
        alignItems: "center",
        justifyContent: "center",
        transform: "scale(1)",
        transition: `color $transitions$durationQuick $transitions$functionDefault`,
        ["-webkit-transition"]: `color $transitions$durationQuick $transitions$functionDefault`,
        willChange: "transform",

        "@media(hover)": {
          "&:hover": {
            color: "$hover",
            transition: `color $transitions$durationDefault $transitions$functionDefault`,
            ["-webkit-transition"]: `color $transitions$durationDefault $transitions$functionDefault`,
          },
        },

        "&:active": {
          transform: "scale($transitions$transformScale)",
          transition: `transform $transitions$durationDefault $transitions$functionDefault`,
          ["-webkit-transition"]: `transform $transitions$durationDefault $transitions$functionDefault`,
        },
      },
    },
  },
});

const butterphli = css({
  width: `${ICON_SIZE.l}`,
  height: `${ICON_SIZE.l}`,

  "&": {
    display: "inline-flex",
    gap: "0.5em",
    alignItems: "center",
  },

  "& svg": {
    width: "100%",
    height: "100%",
    transition: "200ms",
  },

  "& .left": {
    transformOrigin: "center",
  },

  "& .right": {
    transformOrigin: "center",
    transform: "scale(-1, 1)",
  },

  "&:hover .left, &:focus .left": {
    animation: `${flutter} 430ms ease-in-out`,
    "--flip": 1,
  },

  "&:hover .right, &:focus .right": {
    animation: `${flutter} 500ms ease-in-out`,
    "--flip": -1,
  },

  "&:hover svg &:focus svg": {
    transform: "rotate(-5deg)",
    transition: 500,
  },

  "@media (prefers-reduced-motion)": {
    "&:hover .left, &:focus .left, &:hover .right, &:focus .right": {
      animation: "none",
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
      const link = typeof href === "object" ? href.pathname : href;
      return link.charAt(0) === "/" || link.charAt(0) === "#";
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
  minWidth: 44,
  minHeight: 44,
  padding: "$2",
  borderRadius: "50%",
  borderWidth: 2,
  borderStyle: "solid",
  boxShadow: "$1",
  borderColor: "$foreground",
  backgroundColor: "transparent",
  color: "currentcolor",
  transition: `box-shadow $transitions$durationQuick $transitions$functionDefault, border-color $transitions$durationQuick $transitions$functionDefault, background-color $transitions$durationQuick $transitions$functionDefault`,

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
      borderColor: "$foreground",
      backgroundColor: "$foreground",
      color: "$background",
      transition: `box-shadow $transitions$durationDefault $transitions$functionDefault, border-color $transitions$durationDefault $transitions$functionDefault`,
    },
  },

  "&:active": {
    boxShadow: "$5",
  },
});

const StyledYoutubeSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {},
      button: {
        minWidth: 125,
        justifyContent: "center",
        alignItems: "center",
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $red9 0.04%, $red10 100.04%)`,
          color: "$red1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $red8 0.04%, $red7 100.04%)`,
          color: "$red12",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $red10 0.04%, $red9 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $red7 0.04%, $red8 100.04%)`,
            },
          },
        },
      },
      icon: {
        justifyContent: "center",
        minWidth: 44,
        minHeight: 44,
        padding: "$2",
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "$colors$red12",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          borderColor: "$red10",
          backgroundImage: `linear-gradient(175deg, $red9 0.04%, $red10 100.04%)`,
          color: "$red1",
        },

        [`.${darkTheme} &`]: {
          borderColor: "$red7",
          backgroundImage: `linear-gradient(175deg, $red8 0.04%, $red7 100.04%)`,
          color: "$red12",
        },
      },
    },
  },
});

const StyledLinkedInConnect = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {},
      button: {
        minWidth: 125,
        justifyContent: "center",
        alignItems: "center",
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $blue9 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $blue8 0.04%, $blue7 100.04%)`,
          color: "$blue12",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $blue10 0.04%, $blue9 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $blue7 0.04%, $blue8 100.04%)`,
            },
          },
        },
      },
      icon: {
        justifyContent: "center",
        minWidth: 44,
        minHeight: 44,
        padding: "$2",
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: 2,
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          borderColor: "$blue10",
          backgroundImage: `linear-gradient(175deg, $blue9 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          borderColor: "$blue7",
          backgroundImage: `linear-gradient(175deg, $blue8 0.04%, $blue7 100.04%)`,
          color: "$blue12",
        },
      },
    },
  },
});

const StyledViewInNotion = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {},
      button: {
        minWidth: 125,
        justifyContent: "center",
        alignItems: "center",
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $foreground 0.04%, $foregroundMuted 100.04%)`,
          color: "$background",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $foreground 0.04%, $foregroundMuted 100.04%)`,
          color: "$background",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $foregroundMuted 0.04%, $foreground 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $foregroundMuted 0.04%, $foreground 100.04%)`,
            },
          },
        },
      },
      icon: {
        justifyContent: "center",
        minWidth: 44,
        minHeight: 44,
        padding: "$2",
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: 2,
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          borderColor: "$foreground",
          backgroundImage: `linear-gradient(175deg, $foreground 0.04%, $foregroundMuted 100.04%)`,
          color: "$background",
        },

        [`.${darkTheme} &`]: {
          borderColor: "$foreground",
          backgroundImage: `linear-gradient(175deg, $foreground 0.04%, $foregroundMuted 100.04%)`,
          color: "$background",
        },
      },
    },
  },
});

const StyledBlueskyFollow = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    type: {
      link: {},
      button: {
        minWidth: 125,
        justifyContent: "center",
        alignItems: "center",
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $blue9 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $blue8 0.04%, $blue7 100.04%)`,
          color: "$blue12",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $blue10 0.04%, $blue9 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $blue7 0.04%, $blue8 100.04%)`,
            },
          },
        },
      },
      icon: {
        justifyContent: "center",
        maxWidth: 44,
        maxHeight: 44,
        padding: "$2",
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: 2,
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          borderColor: "$blue10",
          backgroundImage: `linear-gradient(175deg, $blue9 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
          borderColor: "$blue7",
          backgroundImage: `linear-gradient(175deg, $blue8 0.04%, $blue7 100.04%)`,
          color: "$blue12",
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
      link: {},
      button: {
        minWidth: 125,
        justifyContent: "center",
        alignItems: "center",
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange10 100.04%)`,
          color: "$orange1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange11 0.04%, $orange9 100.04%)`,
          color: "$orange12",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $orange10 0.04%, $orange9 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange11 100.04%)`,
            },
          },
        },
      },
      icon: {
        justifyContent: "center",
        padding: "$2",
        minHeight: 44,
        minWidth: 44,
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: 2,
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          borderColor: "$orange10",
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange10 100.04%)`,
          color: "$orange1",
        },

        [`.${darkTheme} &`]: {
          borderColor: "$orange10",
          backgroundImage: `linear-gradient(175deg, $orange11 0.04%, $orange10 100.04%)`,
          color: "$orange12",
        },

        /* Optically aligns the RSS Icon */
        "& svg": {
          position: "relative",
          left: 1,
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

const StyledHeadline = styled(TextHeadline, {
  display: "none",

  "@bp2": {
    display: "flex",
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
  if (type === "icon") {
    return (
      <Tooltip title="Subscribe">
        <StyledYoutubeSubscription
          href={YOUTUBE_SUBSCRIBE_URL}
          type={type}
          variant="invisible"
          {...props}
        >
          <Box alignItems="center" gap={2}>
            <VideoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
            <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>
          </Box>
        </StyledYoutubeSubscription>
      </Tooltip>
    );
  }

  return (
    <StyledYoutubeSubscription
      href={YOUTUBE_SUBSCRIBE_URL}
      type={type}
      variant={type === "link" ? "secondary" : "invisible"}
      aria-label="Subscribe to my YouTube channel"
      {...props}
    >
      <Box alignItems="center" gap={type === "button" ? 3 : 4}>
        <VideoIcon
          width={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          height={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          aria-hidden
        />

        {type === "button" && <TextAux color="primary">Subscribe</TextAux>}

        {type === "link" && <StyledHeadline>Subscribe</StyledHeadline>}
      </Box>
    </StyledYoutubeSubscription>
  );
});

export const LinkedInConnectLink = memo(function LinkedInConnectLink({
  type = "link",
  ...props
}: SubscribeProps) {
  if (type === "icon") {
    return (
      <Tooltip title="Connect">
        <StyledLinkedInConnect
          href={SOCIAL.linkedin.url}
          type={type}
          variant="invisible"
          aria-label="Connect with me on LinkedIn"
          {...props}
        >
          <Box alignItems="center" gap={2}>
            <LinkedInLogoIcon
              width={ICON_SIZE.m}
              height={ICON_SIZE.m}
              aria-hidden
            />
            <VisuallyHidden.Root>Connect on LinkedIn</VisuallyHidden.Root>
          </Box>
        </StyledLinkedInConnect>
      </Tooltip>
    );
  }

  return (
    <StyledLinkedInConnect
      href={SOCIAL.linkedin.url}
      type={type}
      variant={type === "link" ? "secondary" : "invisible"}
      {...props}
    >
      <Box alignItems="center" gap={type === "button" ? 3 : 4}>
        <LinkedInLogoIcon
          width={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          height={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          aria-hidden
        />

        {type === "button" && <TextAux color="primary">Connect</TextAux>}

        {type === "link" && <StyledHeadline>Connect</StyledHeadline>}
      </Box>
    </StyledLinkedInConnect>
  );
});

export const NotionViewLink = memo(function NotionViewLink({
  id,
  type = "link",
  ...props
}: NotionViewProps) {
  if (type === "icon") {
    return (
      <Tooltip title="Connect">
        <StyledViewInNotion
          href={`https://phunkren.notion.site/${id}`}
          type={type}
          variant="invisible"
          aria-label="View page in Notion"
          {...props}
        >
          <Box alignItems="center" gap={2}>
            <NotionLogoIcon
              width={ICON_SIZE.m}
              height={ICON_SIZE.m}
              aria-hidden
            />
            <VisuallyHidden.Root>Notion</VisuallyHidden.Root>
          </Box>
        </StyledViewInNotion>
      </Tooltip>
    );
  }

  return (
    <StyledViewInNotion
      href={`https://phunkren.notion.site/${id}`}
      type={type}
      variant={type === "link" ? "secondary" : "invisible"}
      {...props}
    >
      <Box alignItems="center" gap={type === "button" ? 3 : 4}>
        <NotionLogoIcon
          width={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          height={type === "link" ? ICON_SIZE.xl : ICON_SIZE.m}
          aria-hidden
        />

        {type === "button" && <TextAux color="primary">View</TextAux>}

        {type === "link" && <StyledHeadline>View</StyledHeadline>}
      </Box>
    </StyledViewInNotion>
  );
});

export const BlogSubscriptionLink = memo(function BlogSubscribeLink({
  type = "link",
  ...props
}: SubscribeProps) {
  const rssFeedUrl = `${SITE.url}/rss`;

  if (type === "icon") {
    return (
      <Tooltip title="Follow">
        <StyledBlogSubscription
          href={rssFeedUrl}
          type={type}
          variant="invisible"
          {...props}
        >
          <StyledRssIcon size={ICON_SIZE.m} />
          <VisuallyHidden.Root>Follow</VisuallyHidden.Root>
        </StyledBlogSubscription>
      </Tooltip>
    );
  }

  if (type === "button") {
    return (
      <StyledBlogSubscription
        href={rssFeedUrl}
        type={type}
        variant="invisible"
        {...props}
      >
        <Box alignItems="center" gap={2}>
          <StyledRssIcon size={ICON_SIZE.l} />
          <TextAux color="inherit">Follow</TextAux>
        </Box>
      </StyledBlogSubscription>
    );
  }

  if (type === "link") {
    return (
      <StyledBlogSubscription
        href={rssFeedUrl}
        type={type}
        variant="secondary"
        aria-label="Subscribe to my RSS feed"
        {...props}
      >
        <Box alignItems="center" gap={4}>
          <StyledRssIcon size={ICON_SIZE.xl} />
          <StyledHeadline>Follow</StyledHeadline>
        </Box>
      </StyledBlogSubscription>
    );
  }
});

export const XShareLink = memo(function XShareLink({
  url,
  text,
  emoji = "👀",
  variant = "default",
}: XShareProps) {
  const formattedText = `${emoji} ${text}`;
  const formattedAuthor = `🙋‍♂️ ${SOCIAL.x.handle}`;

  const sanitisedText = encodeURIComponent(
    `${formattedText}\n\n${formattedAuthor}\n\n`
  );

  const sanitisedUrl = encodeURIComponent(url);

  const href = buildUrl("https://x.com/intent/tweet", {
    url: sanitisedUrl,
    text: sanitisedText,
  });

  if (variant === "icon") {
    return (
      <Tooltip title={`Share on ${SOCIAL.x.displayName}`}>
        <StyledIconLink href={href}>
          <XLogoIcon size={ICON_SIZE.m} aria-hidden />
          <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>
        </StyledIconLink>
      </Tooltip>
    );
  }

  return (
    <StyledLink href={href} variant="secondary">
      <Box alignItems="center" gap={4}>
        <XLogoIcon size={ICON_SIZE.xl} aria-hidden />
        <StyledHeadline>Tweet</StyledHeadline>
      </Box>
    </StyledLink>
  );
});

export const BlueskyShareLink = memo(function BlueskyShareLink({
  url,
  text,
  emoji = "👀",
  variant = "default",
}: BlueskyShareProps) {
  const formattedText = `${emoji} ${text}`;
  const formattedAuthor = `🙋‍♂️ ${SOCIAL.bluesky.handle}`;

  const sanitisedUrl = encodeURIComponent(url);

  const sanitisedText = encodeURIComponent(
    `${formattedText}\n\n${formattedAuthor}\n\n${sanitisedUrl}`
  );

  const href = buildUrl("https://bsky.app/intent/compose", {
    text: sanitisedText,
  });

  if (variant === "icon") {
    return (
      <Tooltip title={`Share on ${SOCIAL.bluesky.displayName}`}>
        <StyledIconLink href={href}>
          <BlueskyLogoIcon size={ICON_SIZE.m} aria-hidden />
          <VisuallyHidden.Root>Post</VisuallyHidden.Root>
        </StyledIconLink>
      </Tooltip>
    );
  }

  return (
    <StyledLink href={href} variant="secondary">
      <Box alignItems="center" gap={4}>
        <BlueskyLogoIcon size={ICON_SIZE.xl} aria-hidden />
        <StyledHeadline>Post</StyledHeadline>
      </Box>
    </StyledLink>
  );
});

const ButterPhli = memo(function ButterPhli(props: CSS) {
  return (
    <Box {...props}>
      <svg
        id="flutterby"
        className="bluesky-flutter"
        viewBox="0 0 566 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            id="wing"
            fill="currentColor"
            d="M 123.244 35.008 C 188.248 83.809 283.836 176.879 283.836 235.857 C 283.836 316.899 283.879 235.845 283.836 376.038 C 283.889 375.995 282.67 376.544 280.212 383.758 C 266.806 423.111 214.487 576.685 94.841 453.913 C 31.843 389.269 61.013 324.625 175.682 305.108 C 110.08 316.274 36.332 297.827 16.093 225.504 C 10.271 204.699 0.343 76.56 0.343 59.246 C 0.343 -27.451 76.342 -0.206 123.244 35.008 Z"
          />
        </defs>
        <use xlinkHref="#wing" className="left" />
        <use xlinkHref="#wing" className="right" />
      </svg>
    </Box>
  );
});

export const BlueskyFollowLink = memo(function BlueskyFollowLink({
  type = "link",
  ...props
}: SubscribeProps) {
  if (type === "icon") {
    return (
      <Tooltip title="Follow">
        <StyledBlueskyFollow
          href={SOCIAL.bluesky.url}
          className={butterphli}
          type={type}
          variant="invisible"
          {...props}
        >
          <Box alignItems="center" gap={2}>
            <ButterPhli css={{ width: ICON_SIZE.m, height: ICON_SIZE.m }} />
            <VisuallyHidden.Root>Follow</VisuallyHidden.Root>
          </Box>
        </StyledBlueskyFollow>
      </Tooltip>
    );
  }

  return (
    <StyledBlueskyFollow
      href={SOCIAL.bluesky.url}
      type={type}
      className={butterphli}
      variant={type === "link" ? "secondary" : "invisible"}
      aria-label="Follow me on Bluesky"
      {...props}
    >
      <Box alignItems="center" gap={type === "button" ? 3 : 4}>
        <ButterPhli css={{ width: ICON_SIZE.l, height: ICON_SIZE.l }} />

        {type === "button" && <TextAux color="primary">Follow</TextAux>}

        {type === "link" && <StyledHeadline>Follow</StyledHeadline>}
      </Box>
    </StyledBlueskyFollow>
  );
});

export const DownloadLink = memo(function DownloadLink(props: any) {
  return (
    <Tooltip title="Download CV">
      <StyledIconLink download {...props}>
        <DownloadIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <VisuallyHidden.Root>Download CV</VisuallyHidden.Root>
      </StyledIconLink>
    </Tooltip>
  );
});

export const BuyMeCoffeeLink = memo(function BuyMeCoffeeLink({
  variant,
  icon = false,
}: CoffeeProps) {
  const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();

    if (typeof window !== "undefined") {
      window.open(SOCIAL.buyMeCoffee.url, "_blank");
    }
  }, []);

  if (variant === "button") {
    return (
      <Tooltip title={SOCIAL.buyMeCoffee.displayName}>
        <StyledCoffeeButton variant="tertiary" onClick={handleClick}>
          <SiBuymeacoffee size={ICON_SIZE.l} aria-hidden />
          <VisuallyHidden.Root>
            {SOCIAL.buyMeCoffee.displayName}
          </VisuallyHidden.Root>
        </StyledCoffeeButton>
      </Tooltip>
    );
  }

  if (variant === "text") {
    return (
      <Link href={SOCIAL.buyMeCoffee.url} variant="tertiary">
        <TextHeadline>{SOCIAL.buyMeCoffee.displayName}</TextHeadline>
      </Link>
    );
  }

  return (
    <Link
      href={SOCIAL.buyMeCoffee.url}
      variant={icon ? "secondary" : "tertiary"}
    >
      <Box as="span" alignItems="center" gap={4}>
        {icon ? <SiBuymeacoffee size={ICON_SIZE.l} aria-hidden /> : null}
        <StyledHeadline>{SOCIAL.buyMeCoffee.displayName}</StyledHeadline>
      </Box>
    </Link>
  );
});

export const LinkPreview = memo(function LinkPreview({
  href,
  src,
  title,
}: LinkPreviewProps) {
  return (
    <Link href={href} variant="invisible">
      <StyledPreviewLinkContainer direction="vertical">
        {src ? (
          <AspectRatio.Root ratio={16 / 9}>
            <StyledImage
              src={src}
              sizes="(max-width: 1020px) 100vw, 50vw"
              alt=""
              fill
            />
          </AspectRatio.Root>
        ) : null}
        <Box direction="vertical" spacing={2}>
          <TextAux clamp={2}>{title}</TextAux>
        </Box>
      </StyledPreviewLinkContainer>
    </Link>
  );
});
