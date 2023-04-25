import { memo, ReactElement } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { slateDarkA } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social, SocialExtended } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box, BoxProps } from "./Box";
import { PageSeo } from "./SEO";
import { TextAux } from "./Text";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";

import { useScroll } from "../hooks/useScroll";
import { useRouter } from "next/router";

type LayoutProps = {
  children: ReactElement;
};

const HeaderBox = styled(Box, {
  zIndex: "$2",
  width: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  transition:
    "background-color $transitions$durationDefault $transitions$functionDefault",
  ["-webkit-transition"]:
    "background-color $transitions$durationDefault $transitions$functionDefault",

  variants: {
    opaque: {
      true: {
        backgroundColor: "$background",
        color: "$foreground",
      },
      false: {
        backgroundColor: `${slateDarkA.slateA1}`,
        color: `${slateDarkA.slateA12}`,
      },
    },
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  const { asPath } = useRouter();
  const { isHeaderActive } = useScroll();
  const isBlogPost = asPath.includes("/writing/");

  return (
    <HeaderBox
      as="header"
      opaque={isBlogPost || isHeaderActive}
      css={{ "@print": { display: "none !important" } }}
    >
      <Box
        display={{ "@print": "none", "@initial": "flex" }}
        spacingVertical={3}
        spacingLeft={6}
        spacingRight={7}
        gap={7}
        justifyContent="space-between"
        alignItems="center"
        flexGrow
      >
        <Box direction="horizontal" gap={10} alignItems="center">
          <Tooltip title="Home">
            <Link href="/" variant="icon" nextLinkProps={{ shallow: true }}>
              <VisuallyHidden.Root>Home</VisuallyHidden.Root>
              <Logo />
            </Link>
          </Tooltip>

          <Box display={{ "@initial": "none", "@bp2": "flex" }}>
            <Navigation />
          </Box>
        </Box>

        <Box display={{ "@initial": "none", "@bp2": "flex" }}>
          <ThemeToggle compact />
        </Box>

        <Box display={{ "@initial": "flex", "@bp2": "none" }}>
          <NavigationMobile />
        </Box>
      </Box>
    </HeaderBox>
  );
});

export const FooterLayout = memo(function FooterLayout() {
  return (
    <Box
      as="footer"
      direction={{
        "@initial": "vertical",
        "@bp2": "horizontal",
      }}
      spacingVertical={10}
      spacingHorizontal={7}
      gap={6}
      justifyContent="center"
      alignItems="center"
      css={{ background: "$slate2", "@print": { display: "none !important" } }}
    >
      <Box display={{ "@initial": "none", "@bp2": "flex" }}>
        <Social gap="6" />
      </Box>

      <SocialExtended gap="6" />
    </Box>
  );
});

export const Layout = memo(function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <Box
      id="__root"
      direction="vertical"
      css={{
        "@print": { overflow: "visible" },
        "@initial": { overflowX: "hidden" },
        "@bp3": { overflowX: "visible" },
      }}
      className={theme}
    >
      <HeaderLayout />

      <Box
        as="main"
        direction="vertical"
        flexGrow
        css={{ overflowX: "hidden" }}
      >
        {children}
      </Box>

      <FooterLayout />
    </Box>
  );
});

export const ActionButtons = memo(function ActionButtons(props: BoxProps) {
  return (
    <Box
      direction={{ "@initial": "vertical", "@bp2": "horizontal" }}
      gap={4}
      justifyContent={{
        "@initial": "flex-end",
        "@bp2": "flex-end",
      }}
      alignItems={{ "@initial": "flex-end", "@bp2": "center" }}
      spacingBottom={1}
      {...props}
    />
  );
});

export const LoadingLayout = memo(function LoadingLayout() {
  return (
    <Box direction="vertical">
      <TextAux>Loading...</TextAux>
    </Box>
  );
});
