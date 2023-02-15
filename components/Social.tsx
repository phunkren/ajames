import { memo } from "react";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { MdRssFeed } from "react-icons/md";
import { SOCIAL } from "../util/data";
import { ICON_SIZE } from "../util/images";
import { Box } from "./Box";
import { Link } from "./Link";

type Props = {
  size?: string;
};

export const Social = memo(function Social() {
  return (
    <Box as="nav" aria-label="Social Media">
      <Box as="ul" role="list" gap={4} alignItems="center">
        <li>
          <Link
            href={SOCIAL.twitter.url}
            title={SOCIAL.twitter.displayName}
            variant="icon"
          >
            <TwitterLogoIcon
              width={32}
              height={32}
              aria-hidden
              focusable={false}
            />
          </Link>
        </li>

        <li>
          <Link
            href={SOCIAL.linkedin.url}
            title={SOCIAL.linkedin.displayName}
            variant="icon"
            css={{ position: "relative", top: -1 }}
          >
            <LinkedInLogoIcon
              width={30}
              height={30}
              aria-hidden
              focusable={false}
            />
          </Link>
        </li>

        <li>
          <Link title="RSS Feed" href="/rss" variant="icon">
            <MdRssFeed size={36} />
          </Link>
        </li>

        <li>
          <Link
            href={SOCIAL.youtube.url}
            title={SOCIAL.youtube.displayName}
            variant="icon"
          >
            <VideoIcon width={33} height={33} aria-hidden focusable={false} />
          </Link>
        </li>
      </Box>
    </Box>
  );
});
