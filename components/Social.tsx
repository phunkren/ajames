import { Box, HStack } from "./Layout";
import { Link } from "./Link";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";

export function Social() {
  return (
    <HStack as="ul" role="list" gap={4} alignItems="center">
      <li>
        <Link variant="secondary" href="/twitter">
          <Box spacing={0.5}>
            <TwitterLogoIcon width={32} height={32} />
          </Box>
        </Link>
      </li>
      <li>
        <Link variant="secondary" href="/youtube">
          <Box spacing={0.5}>
            <VideoIcon width={32} height={32} />
          </Box>
        </Link>
      </li>
      <li>
        <Link variant="secondary" href="/linkedin">
          <Box spacing={1}>
            <LinkedInLogoIcon width={30} height={30} />
          </Box>
        </Link>
      </li>
      <li>
        <Link variant="secondary" href="/github">
          <Box spacing={1}>
            <GitHubLogoIcon width={28} height={28} />
          </Box>
        </Link>
      </li>
    </HStack>
  );
}
