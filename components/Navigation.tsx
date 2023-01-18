import { memo } from "react";
import {
  ChevronDownIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
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
import { Divider } from "./Divider";
import { useRouter } from "next/router";
import { PROJECTS } from "../util/data";

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

const StyledNavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  gap: "$10",
});

export const Navigation = memo(function Navigation() {
  const { asPath } = useRouter();

  return (
    <Box aria-label="Primary navigation" as="nav">
      <Box as="ul" role="list" gap={10}>
        <NavigationMenu.Root orientation="horizontal">
          <StyledNavigationMenuList role="list">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={asPath === "/about"}>
                <Link variant="secondary" href="/about">
                  <TextHeadline>About</TextHeadline>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={asPath.includes("blog")}>
                <Link variant="secondary" href="/blog">
                  <TextHeadline>Blog</TextHeadline>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={asPath === "/streaming"}>
                <Link variant="secondary" href="/streaming">
                  <TextHeadline>Streaming</TextHeadline>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger asChild>
                <Button css={{ padding: 0, minHeight: 0, gap: "$2" }}>
                  <TextHeadline>Projects</TextHeadline>
                  <ChevronDownIcon width={ICON_SIZE.s} height={ICON_SIZE.s} />
                </Button>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content asChild>
                <Box
                  as="ul"
                  css={{
                    position: "absolute",
                    top: "$10",
                    background: "$backgroundMuted",
                    borderRadius: 4,
                    padding: "$4",
                    minWidth: 200,
                    boxShadow: "$2",
                  }}
                >
                  {PROJECTS.map((project) => (
                    <Box key={project.id} as="li">
                      <NavigationMenu.Link asChild>
                        <Link variant="secondary" href={project.url}>
                          <TextHeadline>{project.name}</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </Box>
                  ))}
                </Box>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator />
          </StyledNavigationMenuList>
        </NavigationMenu.Root>
      </Box>
    </Box>
  );
});

export const NavigationMobile = memo(function NavigationMobile() {
  const { theme } = useTheme();
  const { asPath } = useRouter();

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
            gap={5}
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
              <NavigationMenu.Root orientation="horizontal">
                <NavigationMenu.List role="list" asChild>
                  <Box
                    as="ul"
                    role="list"
                    direction="vertical"
                    gap={5}
                    spacingTop={10}
                  >
                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild active={asPath === "/"}>
                        <Link variant="secondary" href="/">
                          <TextHeadline>Home</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <Box aria-hidden>
                      <Divider />
                    </Box>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild active={asPath === "/about"}>
                        <Link variant="secondary" href="/about">
                          <TextHeadline>About</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <Box aria-hidden>
                      <Divider />
                    </Box>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        asChild
                        active={asPath.includes("blog")}
                      >
                        <Link variant="secondary" href="/blog">
                          <TextHeadline>Blog</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <Box aria-hidden>
                      <Divider />
                    </Box>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        asChild
                        active={asPath === "/streaming"}
                      >
                        <Link variant="secondary" href="/streaming">
                          <TextHeadline>Streaming</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </Box>
                </NavigationMenu.List>
              </NavigationMenu.Root>
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
