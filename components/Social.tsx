import { memo } from "react";
import {
  GitHubLogoIcon,
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

const StyledLink = styled(Link, {
  minWidth: 44,
  minHeight: 44,
});

export const Social = memo(function Social() {
  return (
    <Box as="nav" aria-label="Social Media">
      <Box as="ul" role="list" gap={4} alignItems="center">
        <li>
          <StyledLink
            variant="secondary"
            title={SOCIAL.github.displayName}
            href={SOCIAL.github.url}
          >
            <Box spacing={1}>
              <GitHubLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Box>
          </StyledLink>
        </li>

        <li>
          <StyledLink
            variant="secondary"
            title={SOCIAL.youtube.displayName}
            href={SOCIAL.youtube.url}
          >
            <Box spacing={1}>
              <VideoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Box>
          </StyledLink>
        </li>

        <li>
          <StyledLink
            variant="secondary"
            title={SOCIAL.twitter.displayName}
            href={SOCIAL.twitter.url}
          >
            <Box spacing={1}>
              <TwitterLogoIcon
                width={ICON_SIZE.xl}
                height={ICON_SIZE.xl}
                aria-hidden
                focusable={false}
              />
            </Box>
          </StyledLink>
        </li>

        <li>
          <StyledLink
            variant="secondary"
            title={SOCIAL.github.displayName}
            href={SOCIAL.github.url}
          >
            <Box spacing={1}>
              <StyledRssIcon size={ICON_SIZE.xl} />
            </Box>
          </StyledLink>
        </li>
      </Box>
    </Box>
  );
});
