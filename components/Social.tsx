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

type Props = {
  size?: string;
};

export const Social = memo(function Social() {
  return (
    <Box as="nav" aria-label="Social Media">
      <Box as="ul" role="list" gap={4} alignItems="flex-end">
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
    </Box>
  );
});
