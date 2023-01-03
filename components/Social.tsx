import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { SOCIAL } from "../data/social";
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
                width={32}
                height={32}
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
              <VideoIcon width={32} height={32} aria-hidden focusable={false} />
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
                width={30}
                height={30}
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
                width={28}
                height={28}
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
