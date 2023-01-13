import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { SOCIAL } from "../util/data";
import { ICON_SIZE } from "../util/images";
import { Box } from "./Layout";
import { Link } from "./Link";

export function Social() {
  return (
    <Box as="nav" aria-label="Social Media">
      <Box
        direction="horizontal"
        as="ul"
        role="list"
        gap={4}
        alignItems="center"
      >
        <li>
          <Link
            target="_blank"
            variant="secondary"
            title={SOCIAL.twitter.displayName}
            href={SOCIAL.twitter.url}
          >
            <Box spacing={1}>
              <TwitterLogoIcon
                width={ICON_SIZE.l}
                height={ICON_SIZE.l}
                aria-hidden
                focusable={false}
              />
            </Box>
          </Link>
        </li>

        <li>
          <Link
            target="_blank"
            variant="secondary"
            title={SOCIAL.youtube.displayName}
            href={SOCIAL.youtube.url}
          >
            <Box spacing={1}>
              <VideoIcon
                width={ICON_SIZE.l}
                height={ICON_SIZE.l}
                aria-hidden
                focusable={false}
              />
            </Box>
          </Link>
        </li>

        <li>
          <Link
            target="_blank"
            variant="secondary"
            title={SOCIAL.linkedin.displayName}
            href={SOCIAL.linkedin.url}
          >
            <Box spacing={1}>
              <LinkedInLogoIcon
                width={ICON_SIZE.l}
                height={ICON_SIZE.l}
                aria-hidden
                focusable={false}
              />
            </Box>
          </Link>
        </li>

        <li>
          <Link
            target="_blank"
            variant="secondary"
            title={SOCIAL.github.displayName}
            href={SOCIAL.github.url}
          >
            <Box spacing={1}>
              <GitHubLogoIcon
                width={ICON_SIZE.l}
                height={ICON_SIZE.l}
                aria-hidden
                focusable={false}
              />
            </Box>
          </Link>
        </li>
      </Box>
    </Box>
  );
}
