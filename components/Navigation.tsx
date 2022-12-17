import { Box, HStack } from "./Layout";
import { Link } from "./Link";

export function Navigation() {
  return (
    <Box aria-label="Primary navigation" as="nav">
      <HStack as="ul" role="list" gap={2}>
        <li>
          <Link variant="primary" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link variant="primary" href="/blog">
            Blog
          </Link>
        </li>
        <li>
          <Link variant="secondary" href="/cv">
            CV
          </Link>
        </li>
      </HStack>
    </Box>
  );
}
