import { memo } from "react";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { MdRssFeed } from "react-icons/md";
import { styled } from "../stitches.config";
import { SOCIAL } from "../util/data";
import { ICON_SIZE } from "../util/images";
import { Box } from "./Box";
import { Link } from "./Link";

type Props = {
  size?: string;
};

const StyledLink = styled(Link, {
  minWidth: 44,
  minHeight: 44,
});

export const Social = memo(function Social({ size = "xl" }: Props) {
  return (
    <Box as="nav" aria-label="Social Media">
      <Box as="ul" role="list" gap={4} alignItems="center">
        <li>
          <StyledLink
            href={SOCIAL.twitter.url}
            title={SOCIAL.twitter.displayName}
            variant="secondary"
            css={{ justifyContent: "center", spacing: "$1" }}
          >
            <TwitterLogoIcon
              width={ICON_SIZE[size]}
              height={ICON_SIZE[size]}
              aria-hidden
              focusable={false}
            />
          </StyledLink>
        </li>

        <li>
          <StyledLink
            href={SOCIAL.linkedin.url}
            title={SOCIAL.linkedin.displayName}
            variant="secondary"
            css={{ justifyContent: "center", spacing: "$1" }}
          >
            <LinkedInLogoIcon
              width={ICON_SIZE[size]}
              height={ICON_SIZE[size]}
              aria-hidden
              focusable={false}
            />
          </StyledLink>
        </li>

        <li>
          <StyledLink
            title="RSS Feed"
            href="/rss"
            variant="secondary"
            css={{ justifyContent: "center", spacing: "$1" }}
          >
            <MdRssFeed size={ICON_SIZE[size]} />
          </StyledLink>
        </li>

        <li>
          <StyledLink
            href={SOCIAL.youtube.url}
            title={SOCIAL.youtube.displayName}
            variant="secondary"
            css={{ justifyContent: "center", spacing: "$1" }}
          >
            <VideoIcon
              width={ICON_SIZE[size]}
              height={ICON_SIZE[size]}
              aria-hidden
              focusable={false}
            />
          </StyledLink>
        </li>
      </Box>
    </Box>
  );
});
