import { forwardRef, memo, Ref } from "react";
import NextLink from "next/link";
import { MdRssFeed } from "react-icons/md";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import {
  ArrowRightIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { TextAux, TextHeadline } from "./Text";
import { LinkProps } from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Layout";
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
  textDecoration: "none",

  "&:hover": {
    color: "$blue7",
  },

  "&:active": {
    color: "$blue9",
  },

  "&[aria-current='page']": {
    color: "$blue11",
    textDecoration: "underline",
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

const StyledYoutubeSubscription = styled(Link, {
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
        spacing: "$2",
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
        spacing: "$2",
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
    <StyledBlogSubscription href={rssFeedUrl} type={type} {...props}>
      <Box alignItems="center" gap={2}>
        <StyledRssIcon size={ICON_SIZE.l} />

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
      <StyledIconLink href={href} title="Share on Twitter">
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

export const ReadMoreLink = memo(function ReadMoreLink(props: any) {
  return (
    <Box gap={2} alignItems="center" {...props}>
      <TextAux>Read more</TextAux>
      <ArrowRightIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </Box>
  );
});
