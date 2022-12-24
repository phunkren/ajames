import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Box, HStack, VStack } from "./Layout";
import { Link } from "./Link";
import { TextHeadline } from "./Text";
import { Button } from "./Button";
import { styled } from "../stitches.config";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { gray } from "@radix-ui/colors";

const StyledDialogContent = styled(Dialog.Content, {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: "$10",
  background: gray.gray10,
  width: "75vw",
  height: "100dvh",
  minWidth: 300,
  spacing: "$4",
});

export function NavigationLinks() {
  return (
    <>
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
    </>
  );
}

export function Navigation() {
  return (
    <Box aria-label="Primary navigation" as="nav">
      <HStack as="ul" role="list" gap={7}>
        <NavigationLinks />
      </HStack>
    </Box>
  );
}

export function NavigationMobile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button title="Mobile Navigation Menu">
          <HamburgerMenuIcon width={28} height={28} aria-hidden="true" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledDialogContent>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Mobile Navgiation Menu</Dialog.Title>
          </VisuallyHidden.Root>

          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              This menu contains links to pages on the site, external links to
              my social media accounts, and a toggle for the site theme
            </Dialog.Description>
          </VisuallyHidden.Root>

          <Box justifyContent="flex-end">
            <ThemeToggle />
          </Box>

          <VStack>
            <NavigationLinks />
          </VStack>

          <Box justifyContent="center" css={{ marginTop: "auto" }}>
            <Social />
          </Box>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
