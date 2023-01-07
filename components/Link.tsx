import { forwardRef, Ref } from "react";
import NextLink from "next/link";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { YOUTUBE_SUBSCRIBE_URL } from "../util/youtube";
import { RocketIcon, TwitterLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { TextAux } from "./Text";
import { LinkProps } from "../types/link";
import { buildUrl } from "../util/url";
import { SITE, SOCIAL } from "../util/data";

type TwitterShareProps = {
  url: string;
  text: string;
  emoji?: string;
};

const StyledLink = styled("a", {
  fontWeight: 500,
  letterSpacing: 0.2,

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
        textDecoration: "none",

        [`${lightTheme.selector} &`]: {
          color: "$gray11",
        },

        [`${darkTheme.selector} &`]: {
          color: "$white",
        },
      },
      tertiary: {
        textDecoration: "none",
        color: "inherit",
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
});

const StyledYoutubeSubscription = styled(StyledIconLink, {
  background: "red",
  color: "white",

  "@bp2": {
    gap: "$2",
    padding: "$2 $4",
    borderRadius: 4,
  },
});

const StyledTwitterShare = styled(StyledIconLink, {
  background: "blue",
  color: "white",

  "@bp2": {
    gap: "$2",
    padding: "$2 $4",
    borderRadius: 4,
  },
});

const StyledBlogSubscription = styled(StyledIconLink, {
  background: "white",
  color: "black",

  "@bp2": {
    gap: "$2",
    padding: "$2 $4",
    borderRadius: 4,
  },
});

// 'Notion to Markdown' converts embeds to links
// Render embeds as iframes, and links with the custom Link component
export function MarkdownLink({ node, ...props }) {
  const isEmbedLink = node.children[0].value === "embed";

  if (isEmbedLink) {
    return <iframe src={props.href} width="100%" height="500px"></iframe>;
  }

  return <Link href={props.href} variant="secondary" {...props} />;
}

export function YoutubeSubscribeLink() {
  return (
    <StyledYoutubeSubscription href={YOUTUBE_SUBSCRIBE_URL} variant="tertiary">
      <VideoIcon width={18} height={18} aria-hidden />

      <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>

      <TextAux css={{ display: "none", "@bp2": { display: "initial" } }}>
        Subscribe
      </TextAux>
    </StyledYoutubeSubscription>
  );
}

export function TwitterShareLink({
  url,
  text,
  emoji = "👀",
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

  return (
    <StyledTwitterShare href={href} variant="tertiary">
      <TwitterLogoIcon width={18} height={18} aria-hidden />
      <VisuallyHidden.Root>Tweet</VisuallyHidden.Root>

      <TextAux css={{ display: "none", "@bp2": { display: "initial" } }}>
        Tweet
      </TextAux>
    </StyledTwitterShare>
  );
}

export function BlogSubscribeLink() {
  const rssFeedUrl = `${SITE.url}/rss`;

  return (
    <StyledBlogSubscription href={rssFeedUrl} variant="tertiary">
      <RocketIcon width={18} height={18} aria-hidden />

      <VisuallyHidden.Root>Subscribe</VisuallyHidden.Root>

      <TextAux css={{ display: "none", "@bp2": { display: "initial" } }}>
        Subscribe
      </TextAux>
    </StyledBlogSubscription>
  );
}
