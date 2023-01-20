import { memo } from "react";
import {
  ChevronDownIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { blackA, whiteA } from "@radix-ui/colors";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { ThemeToggle } from "./Theme";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Divider } from "./Divider";
import { PERSONAL, PROJECTS } from "../util/data";
import { Project } from "../types/project";
import { Link } from "./Link";
import { TextAux, TextBody, TextHeadline } from "./Text";
import { Button } from "./Button";
import { Social } from "./Social";
import { Box } from "./Box";

const dialogSlideIn = keyframes({
  "0%": { left: "-100%" },
  "100%": { left: 0 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

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
  left: "100vw",
  transition: "right 3s ease-out",
  animation: `${dialogSlideIn} 200ms ease-out`,

  "&[data-state=open]": {
    left: 0,
  },
});

const StyledNavigationMenuContent = styled(NavigationMenu.Content, {
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease-out` },

  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease-out` },
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

const StyledNavigationSubmenu = styled(Box, {
  position: "absolute",
  top: "$10",
  background: "$backgroundMuted",
  borderRadius: 4,
  minWidth: 350,
  boxShadow: "$2",

  "&:hover": {
    boxShadow: "$4",
  },
});

const StyledNavigationSubmenuLink = styled(Link, {
  flexGrow: 1,
  padding: "$2",
  borderRadius: 4,

  "&:hover": {
    [`.${darkTheme} &:hover`]: {
      backgroundColor: whiteA.whiteA3,
    },

    [`.${lightTheme} &:hover`]: {
      backgroundColor: blackA.blackA3,
    },
  },
});

export const NavigationProjectLink = memo(function NavigationProjectLink({
  src,
  name,
  description,
  url,
}: Project) {
  return (
    <NavigationMenu.Link asChild>
      <StyledNavigationSubmenuLink variant="secondary" href={url}>
        <VisuallyHidden.Root>
          <TextAux>
            {name} - {description}
          </TextAux>
        </VisuallyHidden.Root>

        <Box flexGrow alignItems="center" gap={4} aria-hidden>
          <Box
            css={{
              flexShrink: 0,
              backgroundColor: "$green5",
              borderRadius: 4,
            }}
          >
            <Image src={src} alt="" width={60} height={60} />
          </Box>
          <Box direction="vertical" flexGrow>
            <TextBody>{name}</TextBody>
            <TextAux color="secondary" clamp={1}>
              {description}
            </TextAux>
          </Box>
        </Box>
      </StyledNavigationSubmenuLink>
    </NavigationMenu.Link>
  );
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
              <NavigationMenu.Link asChild active={asPath.includes("writing")}>
                <Link variant="secondary" href="/writing">
                  <TextHeadline>Writing</TextHeadline>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Link asChild active={asPath === "/learning"}>
                <Link variant="secondary" href="/learning">
                  <TextHeadline>Learning</TextHeadline>
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger asChild>
                <Button css={{ padding: 0, gap: "$2" }}>
                  <TextHeadline>Projects</TextHeadline>
                  <ChevronDownIcon width={ICON_SIZE.s} height={ICON_SIZE.s} />
                </Button>
              </NavigationMenu.Trigger>

              <StyledNavigationMenuContent asChild>
                <StyledNavigationSubmenu as="ul">
                  {PROJECTS.map((project) => (
                    <Box key={project.id} as="li" flexGrow>
                      <NavigationProjectLink {...project} />
                    </Box>
                  ))}
                </StyledNavigationSubmenu>
              </StyledNavigationMenuContent>
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
                        <Link
                          variant="secondary"
                          href={`/about#${PERSONAL.initials}`}
                        >
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
                        active={asPath.includes("writing")}
                      >
                        <Link
                          variant="secondary"
                          href={`/writing#${PERSONAL.initials}`}
                        >
                          <TextHeadline>Writing</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <Box aria-hidden>
                      <Divider />
                    </Box>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link
                        asChild
                        active={asPath === "/learning"}
                      >
                        <Link
                          variant="secondary"
                          href={`/learning#${PERSONAL.initials}`}
                        >
                          <TextHeadline>Learning</TextHeadline>
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
