import { forwardRef, Ref } from "react";
import NextLink from "next/link";
import { MdRssFeed } from "react-icons/md";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import {
  ArrowRightIcon,
  RocketIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { TextAux, TextHeadline } from "./Text";
import { LinkProps } from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";
import { Box } from "./Layout";
import { ICON_SIZE } from "../util/images";
import { whiteA } from "@radix-ui/colors";

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
  fontWeight: 500,
  letterSpacing: 0.2,
  color: "inherit",
  textDecoration: "none",

  variants: {
    variant: {
      primary: {
        [`${lightTheme.selector} &`]: {
          color: "$blue11",
        },

        [`${darkTheme.selector} &`]: {
          color: "$blue10",
        },
      },
      secondary: {
        [`${lightTheme.selector} &`]: {
          color: "$gray11",
        },

        [`${darkTheme.selector} &`]: {
          color: "$white",
        },
      },
      tertiary: {
        textDecoration: "underline",
        textDecorationStyle: "dotted",
      },
    },
  },
});

export const Link = forwardRef(
  (
    { href, nextLinkProps, ...props }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
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
  }
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
  boxShadow: "$verticalOffset",
  minWidth: 44,
  minHeight: 44,

  "&:hover": {
    backgroundColor: "$foreground",
    color: "$background",
  },
});

const StyledYoutubeSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",
  boxShadow: "$verticalOffset",

  variants: {
    type: {
      button: {
        padding: "$2 $4",
        backgroundColor: "$red8",
        borderRadius: 4,
      },
      link: {
        color: "inherit",
        boxShadow: "none",
      },
      icon: {
        justifyContent: "center",
        borderRadius: "50%",
        spacing: "$2",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "red",
        color: "white",
        minWidth: 44,
        minHeight: 44,
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
      },
      icon: {
        justifyContent: "center",
        borderRadius: "50%",
        spacing: "$2",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "$foreground",
        backgroundColor: "$amber11",
        color: "white",
        minWidth: 44,
        minHeight: 44,

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
  cursor: "pointer",
  boxShadow: "$verticalOffset",
  padding: "$2",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foreground",
  borderRadius: "50%",

  "&:hover": {
    background: "$foreground",
    color: "$background",
  },
});

// 'Notion to Markdown' converts embeds to links
// Render embeds as iframes, and links with the custom Link component
export function MarkdownLink({ node, ...props }) {
  const isEmbedLink = node.children[0].value === "embed";

  if (isEmbedLink) {
    return <iframe src={props.href} width="100%" height="500px"></iframe>;
  }

  return <Link href={props.href} variant="tertiary" {...props} />;
}

export function YoutubeSubscribeLink({
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
}

export function BlogSubscribeLink({ type = "link", ...props }: SubscribeProps) {
  const rssFeedUrl = `${SITE.url}/rss`;

  return (
    <StyledBlogSubscription href={rssFeedUrl} type={type} {...props}>
      <Box alignItems="center" gap={2}>
        <StyledRssIcon size={ICON_SIZE.l} />

        {type === "button" && (
          <TextAux css={{ color: "inherit" }}>Subscribe</TextAux>
        )}

        {type === "link" && <TextHeadline>Subscribe</TextHeadline>}
      </Box>
    </StyledBlogSubscription>
  );
}

export function TwitterShareLink({
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
      <StyledIconLink href={href} title="Share on Twitter" target="_blank">
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
}

export function ReadMoreLink(props) {
  return (
    <Box gap={2} alignItems="center" {...props}>
      <TextAux>Read more</TextAux>
      <ArrowRightIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </Box>
  );
}
