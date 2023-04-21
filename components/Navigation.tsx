import { memo, useCallback, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import { grassDark } from "@radix-ui/colors";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { keyframes, styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Divider } from "./Divider";
import { PERSONAL, PROJECTS } from "../util/data";
import { Link } from "./Link";
import { TextAux, TextHeadline } from "./Text";
import { Button, MobileNavigationButton } from "./Button";
import { Social } from "./Social";
import { Box } from "./Box";
import { ThemeToggle } from "./Toggle";
import { ABOOT_ID } from "./sections/About";
import { WRITING_ID } from "./sections/Writing";
import { LEARNING_ID } from "./sections/Learning";

export type NavigationProjectLinkProps = {
  id: string;
  name: string;
  url: string;
  description: string;
  src: StaticImageData;
};

const dialogSlideIn = keyframes({
  "0%": { transform: "translate3d(0,0,0)" },
  "100%": { transform: "translate3d(300px,0,0)" },
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
  borderTopRightRadius: "$2",
  borderBottomRightRadius: "$2",
  boxShadow: "$3",
  height: "100dvh",
  width: 300,
  zIndex: "$4",
  transform: "translate3d(0,0,0)",
  animation: `${dialogSlideIn} $transitions$durationDefault $transitions$functionDefault forwards`,
  willChange: "transform",
});

const StyledNavigationMenuContent = styled(NavigationMenu.Content, {
  willChange: "transform, opacity",

  '&[data-state="open"]': {
    animation: `${scaleIn} $transitions$durationDefault $transitions$functionDefault`,
  },
  '&[data-state="closed"]': {
    animation: `${scaleOut} $transitions$durationQuick $transitions$functionDefault`,
  },
});

const StyledNavigationMenuList = styled(NavigationMenu.List, {
  display: "flex",
  gap: "$8",
});

const StyledNavigationSubmenu = styled(Box, {
  position: "absolute",
  top: "$10",
  background: "$backgroundMuted",
  borderRadius: "$1",
  padding: "$1",
  minWidth: 350,
  boxShadow: "$2",
  zIndex: 10,

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
    },
  },
});

const StyledNavigationSubmenuLink = styled(Link, {
  flexGrow: 1,
  alignItems: "center",
  padding: "$2",
  borderRadius: "$1",
});

export const NavigationProjectLink = memo(function NavigationProjectLink({
  src,
  name,
  description,
  url,
}: NavigationProjectLinkProps) {
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
              backgroundColor: grassDark.grass8,
              borderRadius: "$1",
              overflow: "hidden",
            }}
          >
            <Image src={src} alt="" width={44} height={44} />
          </Box>

          <Box direction="vertical" flexGrow>
            <TextHeadline as="span" color="secondary" css={{ lineHeight: 1 }}>
              {name}
            </TextHeadline>
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
  const { asPath, isReady } = useRouter();

  return (
    <NavigationMenu.Root
      aria-label="Primary navigation"
      orientation="horizontal"
    >
      <StyledNavigationMenuList
        aria-label="Primary navigation"
        role="list"
        css={{ alignItems: "center" }}
      >
        <NavigationMenu.Item>
          <NavigationMenu.Link
            asChild
            active={isReady && asPath === `/#${ABOOT_ID}`}
          >
            <Link
              variant="secondary"
              href={`/#${ABOOT_ID}`}
              nextLinkProps={{ scroll: false, shallow: true }}
            >
              <TextHeadline color="currentColor">About</TextHeadline>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            asChild
            active={isReady && asPath === `/#${WRITING_ID}`}
          >
            <Link
              variant="secondary"
              href={`/#${WRITING_ID}`}
              nextLinkProps={{ scroll: false, shallow: true }}
            >
              <TextHeadline>Writing</TextHeadline>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link
            asChild
            active={isReady && asPath === `/#${LEARNING_ID}`}
          >
            <Link
              variant="secondary"
              href={`/#${LEARNING_ID}`}
              nextLinkProps={{ scroll: false, shallow: true }}
            >
              <TextHeadline>Learning</TextHeadline>
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              variant="secondary"
              href={`mailto:${PERSONAL.email}`}
              nextLinkProps={{ scroll: false, shallow: true }}
            >
              <TextHeadline>Contact</TextHeadline>
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
  );
});

export const NavigationMobile = memo(function NavigationMobile() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const { asPath, isReady } = useRouter();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <MobileNavigationButton onClick={handleOpen} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledDialogContent
          id="mobileNav"
          className={theme}
          onEscapeKeyDown={handleClose}
          onInteractOutside={handleClose}
          onPointerDownOutside={handleClose}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Navigation</Dialog.Title>
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
                      <NavigationMenu.Link
                        asChild
                        active={isReady && asPath === `/#${ABOOT_ID}`}
                      >
                        <Link
                          href={`/#${ABOOT_ID}`}
                          variant="secondary"
                          nextLinkProps={{ scroll: false, shallow: true }}
                          onClick={handleClose}
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
                        active={isReady && asPath === `/#${WRITING_ID}`}
                      >
                        <Link
                          href={`/#${WRITING_ID}`}
                          variant="secondary"
                          nextLinkProps={{ scroll: false, shallow: true }}
                          onClick={handleClose}
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
                        active={isReady && asPath === `/#${LEARNING_ID}`}
                      >
                        <Link
                          href={`/#${LEARNING_ID}`}
                          variant="secondary"
                          nextLinkProps={{ scroll: false, shallow: true }}
                          onClick={handleClose}
                        >
                          <TextHeadline>Learning</TextHeadline>
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <Box aria-hidden>
                      <Divider />
                    </Box>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          variant="secondary"
                          href={`mailto:${PERSONAL.email}`}
                          nextLinkProps={{ scroll: false, shallow: true }}
                        >
                          <TextHeadline>Contact</TextHeadline>
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
