import { Box, HStack } from "./Layout";
import { Link } from "./Link";
import { TextHeadline } from "./Text";

export function Navigation() {
  return (
    <Box aria-label="Primary navigation" as="nav">
      <HStack as="ul" role="list" gap={7}>
        <li>
          <Link variant="secondary" href="/">
            <TextHeadline>Home</TextHeadline>
          </Link>
        </li>
        <li>
          <Link variant="secondary" href="/blog">
            <TextHeadline>Blog</TextHeadline>
          </Link>
        </li>
        <li>
          <Link variant="secondary" href="/cv">
            <TextHeadline>CV</TextHeadline>
          </Link>
        </li>
      </HStack>
    </Box>
  );
}
