import { memo } from "react";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { styled } from "../stitches.config";
import { Box } from "./Layout";
import { Link } from "./Link";
import { TextHeadline } from "./Text";
import { Button } from "./Button";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";

const StyledDialogContent = styled(Dialog.Content, {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$backgroundMuted",
  boxShadow: "$3",
  width: "75vw",
  height: "100dvh",
  minWidth: 300,
  zIndex: 99,
});

const StyledHamburgerMenuIcon = styled(HamburgerMenuIcon, {
  "button[data-state=open] > &": {
    display: "none",
  },

  "button[data-state=closed] > &": {
    display: "flex",
  },
});

const StyledCloseMenuIcon = styled(Cross1Icon, {
  "button[data-state=open] > &": {
    display: "flex",
  },

  "button[data-state=closed] > &": {
    display: "none",
  },
});

export const Navigation = memo(function Navigation() {
  return (
    <Box aria-label="Primary navigation" as="nav">
      <Box as="ul" role="list" gap={10}>
        <Box as="li">
          <Link variant="secondary" href="/about">
            <TextHeadline>About</TextHeadline>
          </Link>
        </Box>
        <Box as="li">
          <Link variant="secondary" href="/blog">
            <TextHeadline>Blog</TextHeadline>
          </Link>
        </Box>
        <Box as="li">
          <Link variant="secondary" href="/streaming">
            <TextHeadline>Streaming</TextHeadline>
          </Link>
        </Box>
      </Box>
    </Box>
  );
});

export const NavigationMobile = memo(function NavigationMobile() {
  const { theme } = useTheme();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button title="Mobile Navigation Menu">
          <StyledHamburgerMenuIcon
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            aria-hidden
          />

          <StyledCloseMenuIcon
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            aria-hidden
          />
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledDialogContent className={theme}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Mobile Navigation Menu</Dialog.Title>
          </VisuallyHidden.Root>

          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              This menu contains links to pages on the site, external links to
              my social media accounts, and a toggle for the site theme
            </Dialog.Description>
          </VisuallyHidden.Root>

          <Box
            direction="vertical"
            spacingVertical={7}
            spacingHorizontal={6}
            gap={10}
            flexGrow
          >
            <Box justifyContent="flex-end">
              <ThemeToggle />
            </Box>

            <Box
              as="ul"
              role="list"
              direction="vertical"
              gap={10}
              spacingTop={10}
              spacingHorizontal={4}
            >
              <Box as="li">
                <Link variant="secondary" href="/">
                  <TextHeadline>Home</TextHeadline>
                </Link>
              </Box>

              <Box as="li">
                <Link variant="secondary" href="/about">
                  <TextHeadline>About</TextHeadline>
                </Link>
              </Box>

              <Box as="li">
                <Link variant="secondary" href="/blog">
                  <TextHeadline>Blog</TextHeadline>
                </Link>
              </Box>

              <Box as="li">
                <Link variant="secondary" href="/streaming">
                  <TextHeadline>Streaming</TextHeadline>
                </Link>
              </Box>
            </Box>

            <Box justifyContent="center" css={{ marginTop: "auto" }}>
              <Social />
            </Box>
          </Box>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
