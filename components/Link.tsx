import { forwardRef, memo, Ref, AnchorHTMLAttributes } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { UrlObject } from "url";
import { MdRssFeed } from "react-icons/md";
import {
  DownloadIcon,
  HeartIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import { buildUrl } from "../util/url";
import { ICON_SIZE } from "../util/images";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Box";
import { Tooltip } from "./Tooltip";
import { TextAux, TextHeadline } from "./Text";

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

type CoffeeProps = {
  icon?: boolean;
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
  borderRadius: "50%",
  padding: "$2",
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
        boxShadow: "0 0 0 2px $colors$red8",

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
        padding: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "$foreground",
        color: "white",
        minWidth: 44,
        minHeight: 44,
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

const StyledLinkedInConnect = styled(Link, {
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
        boxShadow: "0 0 0 2px $colors$blue10",

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
        padding: "$2",
        borderWidth: 2,
        borderStyle: "solid",

        minWidth: 44,
        minHeight: 44,
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

        boxShadow: "0 0 0 2px $colors$amber9",

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $amber12 0.04%, $amber11 100.04%)`,
          color: "$amber1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $amber9 0.04%, $amber11 100.04%)`,
          color: "$amber12",
        },

        "@media(hover)": {
          "&:hover": {
            [`.${lightTheme} &`]: {
              backgroundImage: `linear-gradient(185deg, $amber12 0.04%, $amber11 100.04%)`,
              color: "$amber1",
            },

            [`.${darkTheme} &`]: {
              backgroundImage: `linear-gradient(185deg, $amber10 0.04%, $amber11 100.04%)`,
              color: "$amber12",
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
        padding: "$2",
        borderWidth: 2,
        borderStyle: "solid",
        minWidth: 44,
        minHeight: 44,
        boxShadow: "$1",

        [`.${lightTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $amber12 0.04%, $amber11 100.04%)`,
          color: "$amber1",
        },

        [`.${darkTheme} &`]: {
          backgroundImage: `linear-gradient(185deg, $amber9 0.04%, $amber11 100.04%)`,
          color: "$amber12",
        },

        "&:active": {
          boxShadow: "$5",
        },

        /* Optically aligns the RSS Icon */
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
      <Box alignItems="center" gap={2}>
        <VideoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />

        {type === "button" && <TextAux color="primary">Subscribe</TextAux>}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}
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
      <Box alignItems="center" gap={2}>
        <LinkedInLogoIcon
          style={{ position: "relative", top: -1 }}
          width={ICON_SIZE.m}
          height={ICON_SIZE.m}
          aria-hidden
        />

        {type === "button" && <TextAux color="primary">Connect</TextAux>}

        {type === "link" && <TextHeadline>Connect</TextHeadline>}
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
      <Tooltip title="Subscribe">
        <StyledBlogSubscription
          href={rssFeedUrl}
          type={type}
          variant="invisible"
          {...props}
        >
          <StyledRssIcon size={ICON_SIZE.m} />
          <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>
        </StyledBlogSubscription>
      </Tooltip>
    );
  }

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
      <Tooltip title="Share on Twitter">
        <StyledIconLink href={href} variant="icon">
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
      <Box alignItems="center" gap={2}>
        <TwitterLogoIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        <TextHeadline>Tweet</TextHeadline>
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
  icon = false,
}: CoffeeProps) {
  return (
    <StyledLink
      href={SOCIAL.buyMeCoffee.url}
      variant={icon ? "secondary" : "tertiary"}
    >
      <Box as="span" alignItems="center" gap={2}>
        {icon ? (
          <HeartIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
        ) : null}
        <TextHeadline>{SOCIAL.buyMeCoffee.displayName}</TextHeadline>
      </Box>
    </StyledLink>
  );
});
