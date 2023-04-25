import { memo } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  CodeSandboxLogoIcon,
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  ImageIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { MdRssFeed } from "react-icons/md";
import { SOCIAL } from "../util/data";
import { Box } from "./Box";
import {
  BlogSubscriptionLink,
  Link,
  LinkedInConnectLink,
  YoutubeSubscribeLink,
} from "./Link";
import { Tooltip } from "./Tooltip";
import { SpacingUnit } from "../styles/flex";
import { styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { SiBuymeacoffee } from "react-icons/si";
import { Divider } from "./Divider";
import { TextAux, TextTitle2, TextTitle3 } from "./Text";

type SocialBaseProps = any; // ComponentProps<typeof StyledBox>;

type Props = SocialBaseProps & {
  gap?: SpacingUnit;
};

const StyledBox = styled(Box, {
  "@landscape": {
    transformOrigin: "center left",
  },

  "@portrait": {
    transformOrigin: "center center",
  },

  variants: {
    size: {
      s: { transform: "scale(0.75)" },
      m: { transform: "scale(1)" },
      l: { transform: "scale(1.25)" },
      xl: { transform: "scale(1.5)" },
    },
  },
});

export const Social = memo(function Social({ gap = "4", ...props }: Props) {
  return (
    <StyledBox as="nav" aria-label="Social Media" {...props}>
      <Box as="ul" role="list" gap={gap} alignItems="baseline">
        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.twitter.displayName}>
            <Link
              href={SOCIAL.twitter.url}
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.twitter.displayName}
              </VisuallyHidden.Root>
              <TwitterLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>
        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.linkedin.displayName}>
            <Link
              href={SOCIAL.linkedin.url}
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.linkedin.displayName}
              </VisuallyHidden.Root>
              <LinkedInLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title="RSS">
            <Link
              href="/rss"
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>RSS</VisuallyHidden.Root>
              <MdRssFeed size={ICON_SIZE.xl} aria-hidden />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.youtube.displayName}>
            <Link
              href={SOCIAL.youtube.url}
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.youtube.displayName}
              </VisuallyHidden.Root>
              <VideoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>
      </Box>
    </StyledBox>
  );
});

export const SocialExtended = memo(function SocialExtended({
  gap = "4",
  ...props
}: Props) {
  return (
    <StyledBox as="nav" aria-label="Extended Social Media" {...props}>
      <Box as="ul" role="list" gap={gap} alignItems="baseline">
        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.github.displayName}>
            <Link
              href={SOCIAL.github.url}
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.github.displayName}
              </VisuallyHidden.Root>
              <GitHubLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.blueSky.displayName}>
            <Link
              href={SOCIAL.blueSky.url}
              variant="icon"
              css={{ position: "relative", top: 1, left: 1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.blueSky.displayName}
              </VisuallyHidden.Root>
              <ImageIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                focusable={false}
                aria-hidden
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.codeSandbox.displayName}>
            <Link href={SOCIAL.codeSandbox.url} variant="icon">
              <VisuallyHidden.Root>
                {SOCIAL.codeSandbox.displayName}
              </VisuallyHidden.Root>
              <CodeSandboxLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.buyMeCoffee.displayName}>
            <Link href={SOCIAL.buyMeCoffee.url} variant="icon">
              <VisuallyHidden.Root>
                {SOCIAL.buyMeCoffee.displayName}
              </VisuallyHidden.Root>
              <SiBuymeacoffee
                size={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>
      </Box>
    </StyledBox>
  );
});

export const SocialSponsored = memo(function SocialSponsored() {
  return (
    <Box
      display={{ "@print": "none", "@initial": "flex" }}
      direction="vertical"
      spacingVertical={{ "@print": 0, "@initial": 12 }}
      spacingHorizontal={7}
      css={{
        background: `linear-gradient($slate2 0.04%, $slate1 100.04%)`,
      }}
    >
      <Box
        direction="vertical"
        gap={{
          "@initial": 11,
          "@bp2": 12,
        }}
        container="l"
        spacingBottom={{
          "@initial": 10,
          "@bp2": 12,
        }}
        css={{ zIndex: "$1" }}
      >
        <Divider variant="secondary" />

        <Box
          direction="vertical"
          gap={{
            "@initial": 7,
            "@bp2": 10,
          }}
        >
          <Box direction="vertical" alignItems="center">
            <TextTitle2 css={{ color: "$focus" }}>
              Enjoy the content?
            </TextTitle2>

            <TextAux
              color="secondary"
              css={{ display: "flex", "@bp2": { display: "none" } }}
            >
              Like & Subscribe
            </TextAux>
          </Box>

          <Box justifyContent="space-around" alignItems="center" gap={8}>
            <LinkedInConnectLink />

            <BlogSubscriptionLink />

            <YoutubeSubscribeLink />
          </Box>
        </Box>

        <Divider variant="secondary" />
      </Box>
    </Box>
  );
});
