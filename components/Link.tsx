import { forwardRef, Ref } from "react";
import NextLink from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { CSS, darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import { RocketIcon, TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { TextAux, TextHeadline } from "./Text";
import { LinkProps } from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";
import { whiteA } from "@radix-ui/colors";
import { Box } from "./Layout";

type TwitterShareProps = {
  url: string;
  text: string;
  emoji?: string;
  variant?: "default" | "icon";
};

type SubscribeProps = CSS & {
  variant?: "link" | "button";
};

const StyledLink = styled("a", {
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
    return (
      <NextLink href={href} passHref legacyBehavior {...nextLinkProps}>
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
  borderColor: whiteA.whiteA10,
  minWidth: 44,
  minHeight: 44,
});

const StyledYoutubeSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    variant: {
      button: {
        padding: "$2 $4",
        background: "red",
        borderRadius: 4,
        color: "white",
      },
      link: {},
    },
  },
});

const StyledBlogSubscription = styled(Link, {
  display: "flex",
  alignItems: "center",

  variants: {
    variant: {
      button: {
        padding: "$2 $4",
        background: "white",
        borderRadius: 4,
        color: "black",
      },
      link: {
        color: "white",
      },
    },
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
  variant = "link",
  ...props
}: SubscribeProps) {
  return (
    <StyledYoutubeSubscription
      href={YOUTUBE_SUBSCRIBE_URL}
      variant={variant}
      {...props}
    >
      <Box alignItems="center" gap={2}>
        <VideoIcon width={18} height={18} aria-hidden />
        {variant === "button" && <TextAux>Subscribe</TextAux>}
        {variant === "link" && <TextHeadline>Subscribe</TextHeadline>}
      </Box>
    </StyledYoutubeSubscription>
  );
}

export function BlogSubscribeLink({
  variant = "link",
  ...props
}: SubscribeProps) {
  const rssFeedUrl = `${SITE.url}/rss`;

  return (
    <StyledBlogSubscription href={rssFeedUrl} variant={variant} {...props}>
      <Box alignItems="center" gap={2}>
        <RocketIcon width={18} height={18} aria-hidden />
        {variant === "button" && <TextAux>Subscribe</TextAux>}
        {variant === "link" && <TextHeadline>Subscribe</TextHeadline>}
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
    `${formattedText}\n${formattedAuthor}\n\n`
  );

  const sanitisedUrl = encodeURIComponent(url);

  const href = buildUrl("https://twitter.com/intent/tweet", {
    url: sanitisedUrl,
    text: sanitisedText,
  });

  if (variant === "icon") {
    return (
      <StyledIconLink href={href} title="Share on Twitter">
        <TwitterLogoIcon width={18} height={18} aria-hidden />
        <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>
      </StyledIconLink>
    );
  }

  return (
    <Link href={href} title="Share on Twitter">
      <Box alignItems="center" gap={2}>
        <TwitterLogoIcon width={18} height={18} aria-hidden />
        <TextHeadline>Tweet</TextHeadline>
      </Box>
    </Link>
  );
}
