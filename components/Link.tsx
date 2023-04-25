import {
  forwardRef,
  memo,
  Ref,
  AnchorHTMLAttributes,
  useCallback,
  MouseEvent,
} from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";
import { MdRssFeed } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import {
  DownloadIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
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

export type LinkProps = CSS &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string | UrlObject;
    nextLinkProps?: Omit<NextLinkProps, "href">;
    variant?: "primary" | "secondary";
  };

type TwitterShareProps = {
  url: string;
  text: string;
  emoji?: string;
  variant?: "default" | "icon";
};

type SubscribeProps = CSS & {
  type?: "link" | "icon" | "button";
};

type CoffeeProps = CSS & {
  variant?: "button";
  icon?: boolean;
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

const StyledLink = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  gap: "$2",
  color: "currentcolor",
  textDecorationLine: "none",
  textUnderlineOffset: "$space$1",
  width: "fit-content",

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
          backgroundImage: `linear-gradient(175deg, $red9 0.04%, $red10 100.04%)`,
          color: "$red1",
        },

        [`.${darkTheme} &`]: {
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
        borderColor: "$colors$blue12",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $blue9 0.04%, $blue10 100.04%)`,
          color: "$blue1",
        },

        [`.${darkTheme} &`]: {
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
        padding: "$2 $4",
        borderRadius: "$1",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange10 100.04%)`,
          color: "$orange1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange7 100.04%)`,
          color: "$orange12",
        },

        "@media(hover)": {
          color: "currentcolor",

          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $orange10 0.04%, $orange9 100.04%)`,
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(175deg, $orange7 0.04%, $orange9 100.04%)`,
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
        borderColor: "$colors$orange12",
        ...LINK_BUTTON_PROPS,

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange10 100.04%)`,
          color: "$orange1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(175deg, $orange9 0.04%, $orange7 100.04%)`,
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
      {...props}
    >
      <Box alignItems="center" gap={type === "button" ? 2 : 4}>
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
      <Box alignItems="center" gap={type === "button" ? 2 : 4}>
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
          <StyledRssIcon size={ICON_SIZE.m} />
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
      <Tooltip title="Share on Twitter">
        <StyledIconLink href={href}>
          <TwitterLogoIcon
            width={ICON_SIZE.m}
            height={ICON_SIZE.m}
            aria-hidden
          />
          <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>
        </StyledIconLink>
      </Tooltip>
    );
  }

  return (
    <StyledLink href={href} variant="secondary">
      <Box alignItems="center" gap={4}>
        <TwitterLogoIcon
          width={ICON_SIZE.xl}
          height={ICON_SIZE.xl}
          aria-hidden
        />
        <StyledHeadline>Tweet</StyledHeadline>
      </Box>
    </StyledLink>
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

  return (
    <Link
      href={SOCIAL.buyMeCoffee.url}
      variant={icon ? "secondary" : "tertiary"}
    >
      <Box as="span" alignItems="center" gap={4}>
        {icon ? <SiBuymeacoffee size={30} aria-hidden /> : null}
        <StyledHeadline>{SOCIAL.buyMeCoffee.displayName}</StyledHeadline>
      </Box>
    </Link>
  );
});
