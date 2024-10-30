import { memo } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  CodeSandboxLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
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
import { PiButterfly } from "react-icons/pi";
import { SiBuymeacoffee } from "react-icons/si";
import { Divider } from "./Divider";
import { TextAux, TextTitle2 } from "./Text";

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

export const Social = memo(function Social({
  gap = "4",
  compact,
  ...props
}: Props) {
  return (
    <StyledBox as="nav" aria-label="Social Media" {...props}>
      <Box as="ul" role="list" gap={gap} alignItems="baseline">
        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.bluesky.displayName}>
            <Link
              href={SOCIAL.bluesky.url}
              variant="icon"
              css={{ position: "relative", top: -1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.bluesky.displayName}
              </VisuallyHidden.Root>

              <PiButterfly
                size={compact ? ICON_SIZE.l : ICON_SIZE.xl}
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
                width={compact ? ICON_SIZE.l : ICON_SIZE.xl}
                height={compact ? ICON_SIZE.l : ICON_SIZE.xl}
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
              css={{ position: "relative", top: 1 }}
            >
              <VisuallyHidden.Root>RSS</VisuallyHidden.Root>
              <MdRssFeed
                size={compact ? ICON_SIZE.l : ICON_SIZE.xxl}
                aria-hidden
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.youtube.displayName}>
            <Link
              href={SOCIAL.youtube.url}
              variant="icon"
              css={{ position: "relative", top: 1 }}
            >
              <VisuallyHidden.Root>
                {SOCIAL.youtube.displayName}
              </VisuallyHidden.Root>
              <VideoIcon
                width={compact ? ICON_SIZE.l : ICON_SIZE.xxl}
                height={compact ? ICON_SIZE.l : ICON_SIZE.xxl}
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
  compact,
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
                width={compact ? ICON_SIZE.l : ICON_SIZE.xl}
                height={compact ? ICON_SIZE.l : ICON_SIZE.xl}
                aria-hidden
                focusable={false}
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
                width={compact ? ICON_SIZE.l : ICON_SIZE.xl}
                height={compact ? ICON_SIZE.l : ICON_SIZE.xl}
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
                size={compact ? ICON_SIZE.l : ICON_SIZE.xl}
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
        background: `$slate1`,
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
        <Divider />

        <Box
          direction="vertical"
          gap={{
            "@initial": 7,
            "@bp2": 10,
          }}
        >
          <Box direction="vertical" alignItems="center">
            <TextTitle2 css={{ color: "$focus" }}>
              Enjoying the content?
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

        <Divider />
      </Box>
    </Box>
  );
});
