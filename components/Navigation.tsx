import { memo, useCallback, useRef } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { blackA, greenDark, whiteA } from "@radix-ui/colors";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Divider } from "./Divider";
import { PROJECTS } from "../util/data";
import { Project } from "../types/project";
import { Link } from "./Link";
import { TextAux, TextHeadline } from "./Text";
import { Button, MobileNavigationButton } from "./Button";
import { Social } from "./Social";
import { Box } from "./Box";
import { ThemeToggle } from "./Toggle";

const dialogSlideIn = keyframes({
  "0%": { transform: "translateX(0)" },
  "100%": { transform: "translateX(300px)" },
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
  position: "fixed",
  top: 0,
  left: -300,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$backgroundMuted",
  borderRadius: 0,
  boxShadow: "$3",
  height: "100dvh",
  width: 300,
  zIndex: 99,
  transform: "translateX(0)",
  animation: `${dialogSlideIn} 300ms linear 50ms forwards`,
});

const StyledNavigationMenuContent = styled(NavigationMenu.Content, {
  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease-out` },

  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease-out` },
});

const StyledNavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  gap: "$8",
});

const StyledNavigationSubmenu = styled(Box, {
  position: "absolute",
  top: "$10",
  background: "$backgroundMuted",
  borderRadius: 4,
  minWidth: 350,
  boxShadow: "$2",
  zIndex: 10,

  "&:hover": {
    boxShadow: "$4",
  },
});

const StyledNavigationSubmenuLink = styled(Link, {
  flexGrow: 1,
  padding: "$2",
  borderRadius: 4,

  [`.${darkTheme} &:hover`]: {
    backgroundColor: whiteA.whiteA3,
  },

  [`.${lightTheme} &:hover`]: {
    backgroundColor: blackA.blackA3,
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
      <StyledNavigationSubmenuLink variant="invisible" href={url}>
        <VisuallyHidden.Root>
          <TextAux>
            {name} - {description}
          </TextAux>
        </VisuallyHidden.Root>

        <Box flexGrow alignItems="center" gap={4} aria-hidden>
          <Box
            css={{
              flexShrink: 0,
              backgroundColor: greenDark.green8,
              borderRadius: 4,
            }}
          >
            <Image src={src} alt="" width={44} height={44} />
          </Box>
          <Box direction="vertical" flexGrow gap={1}>
            <TextAux>{name}</TextAux>
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
      <Box as="ul" role="list">
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
                <Button variant="tertiary" css={{ padding: 0, gap: "$2" }}>
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleLinkClick = useCallback(() => {
    closeButtonRef.current?.click();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <MobileNavigationButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledDialogContent id="mobileNav" className={theme}>
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
              <VisuallyHidden.Root>
                <Dialog.Close ref={closeButtonRef}>Close menu</Dialog.Close>
              </VisuallyHidden.Root>

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
                        <Link
                          href="/"
                          variant="secondary"
                          onClick={handleLinkClick}
                        >
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
                          href="/about"
                          variant="secondary"
                          onClick={handleLinkClick}
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
                          href="/writing"
                          variant="secondary"
                          onClick={handleLinkClick}
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
                          href="/learning"
                          variant="secondary"
                          onClick={handleLinkClick}
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
