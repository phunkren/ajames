import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { gray } from "@radix-ui/colors";
import { styled } from "../stitches.config";
import { Box } from "./Layout";
import { Link } from "./Link";
import { TextHeadline } from "./Text";
import { Button } from "./Button";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { ICON_SIZE } from "../util/images";

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
        <Link variant="secondary" href="/about">
          <TextHeadline>About</TextHeadline>
        </Link>
      </li>
      <li>
        <Link variant="secondary" href="/blog">
          <TextHeadline>Blog</TextHeadline>
        </Link>
      </li>
      <li>
        <Link variant="secondary" href="/streaming">
          <TextHeadline>Streaming</TextHeadline>
        </Link>
      </li>
    </>
  );
}

export function Navigation() {
  return (
    <Box aria-label="Primary navigation" as="nav">
      <Box direction="horizontal" as="ul" role="list" gap={7}>
        <NavigationLinks />
      </Box>
    </Box>
  );
}

export function NavigationMobile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button title="Mobile Navigation Menu">
          <HamburgerMenuIcon
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            aria-hidden="true"
          />
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

          <Box direction="vertical">
            <NavigationLinks />
          </Box>

          <Box justifyContent="center" css={{ marginTop: "auto" }}>
            <Social />
          </Box>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
