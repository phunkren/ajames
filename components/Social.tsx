import { memo } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { MdRssFeed } from "react-icons/md";
import { SOCIAL } from "../util/data";
import { Box } from "./Box";
import { Link } from "./Link";
import { Tooltip } from "./Tooltip";
import { SpacingUnit } from "../styles/flex";
import { styled } from "../stitches.config";

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
      <Box as="ul" role="list" gap={gap} alignItems="flex-end">
        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.twitter.displayName}>
            <Link href={SOCIAL.twitter.url} variant="icon">
              <VisuallyHidden.Root>
                {SOCIAL.twitter.displayName}
              </VisuallyHidden.Root>
              <TwitterLogoIcon
                width={32}
                height={32}
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
                width={30}
                height={30}
                aria-hidden
                focusable={false}
              />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title="RSS">
            <Link href="/rss" variant="icon">
              <VisuallyHidden.Root>RSS</VisuallyHidden.Root>
              <MdRssFeed size={36} aria-hidden />
            </Link>
          </Tooltip>
        </Box>

        <Box as="li" alignItems="flex-end">
          <Tooltip title={SOCIAL.youtube.displayName}>
            <Link href={SOCIAL.youtube.url} variant="icon">
              <VisuallyHidden.Root>
                {SOCIAL.youtube.displayName}
              </VisuallyHidden.Root>
              <VideoIcon width={33} height={33} aria-hidden focusable={false} />
            </Link>
          </Tooltip>
        </Box>
      </Box>
    </StyledBox>
  );
});
