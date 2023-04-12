import { memo, ReactElement, useEffect } from "react";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { blueDark, redDark } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { css, styled } from "../stitches.config";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box, BoxProps } from "./Box";
import { PageSeo } from "./SEO";
import {
  TextAux,
  TextHeadline,
  TextTitle,
  TextTitle1,
  TextTitle2,
  TextTitle3,
} from "./Text";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";
import banner from "../public/images/mugshot.png";
import { PERSONAL } from "../util/data";

type LayoutProps = {
  children: ReactElement;
};

const StyledHeroLayout = styled(Box, {
  display: "none !important",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",

  "@bp3": {
    display: "flex !important",
  },
});

const StyledHeroContainer = styled(Box, {
  background: "$slate1",
});

const StyledImage = styled(Image, {
  position: "absolute",
  maxHeight: "95vh",
  bottom: 0,
  right: 0,
  pointerEvents: "none",
  filter: "brightness(75%)",
  objectFit: "contain",
  objectPosition: "bottom",

  "@bp3": {
    right: "12.5%",
    transform: "translateX(25%)",
  },

  "@bp4": {
    right: "25%",
  },
});

const StyledFilter = styled(Box, {
  position: "absolute",
  inset: 0,
  filter: "blur(50px)",
  background: `conic-gradient(from -25deg, ${redDark.red8}, ${redDark.red9}, ${redDark.red10}, ${redDark.red11}, ${blueDark.blue7}, ${blueDark.blue8}, ${blueDark.blue9})`,
  willChange: "opacity",

  "&::after": {
    content: "",
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
  },
});

const HeaderBox = styled(Box, {
  zIndex: 500,
  width: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
});

export const HeaderLayout = memo(function HeaderLayout() {
  return (
    <HeaderBox as="header">
      <Box
        display={{ "@print": "none", "@initial": "flex" }}
        spacingVertical={4}
        spacingHorizontal={{ "@initial": 4, "@bp2": 7 }}
        gap={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="space-between"
        alignItems="center"
        flexGrow
      >
        <Box direction="horizontal" gap={10} alignItems="center">
          <Tooltip title="Home">
            <Link href="/" variant="icon">
              <VisuallyHidden.Root>Home</VisuallyHidden.Root>
              <Logo />
            </Link>
          </Tooltip>

          <Box display={{ "@initial": "none", "@bp2": "flex" }}>
            <Navigation />
          </Box>
        </Box>

        <Box display={{ "@initial": "none", "@bp2": "flex" }}>
          <ThemeToggle />
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
      spacingVertical={4}
      spacingHorizontal={4}
      justifyContent="center"
      css={{ "@print": { display: "none" } }}
    >
      <Social />
    </Box>
  );
});

export const Layout = memo(function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <>
      <PageSeo />

      <Box
        id="__root"
        direction="vertical"
        css={{ overflowX: "hidden", "@bp3": { overflowX: "visible" } }}
        className={theme}
        gap={12}
      >
        <HeaderLayout />

        <Box as="main" direction="vertical" flexGrow>
          {children}
        </Box>

        <FooterLayout />
      </Box>
    </>
  );
});

export const HeroLayout = memo(function HeroLayout() {
  return (
    <StyledHeroLayout>
      <StyledHeroContainer direction="vertical" flexGrow>
        <StyledFilter />

        <StyledImage src={banner} alt="" sizes="100vw" quality={100} priority />

        <Box
          direction="vertical"
          spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
          flexGrow
        >
          <Box direction="vertical" position="relative" flexGrow>
            <Box
              direction="vertical"
              container="l"
              justifyContent={{
                "@initial": "center",
                "@bp2": "flex-end",
                "@bp3": "space-between",
              }}
              flexGrow
            >
              <Box direction="vertical" justifyContent="center" flexGrow>
                <TextTitle css={{ textShadow: "$textShadow" }}>
                  {PERSONAL.name}
                </TextTitle>

                <TextHeadline css={{ textShadow: "$textShadow" }}>
                  {PERSONAL.occupation} / {PERSONAL.location}
                </TextHeadline>

                <Box position="relative" css={{ left: -12 }} spacingTop={4}>
                  <Social size="s" gap="1" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledHeroContainer>
    </StyledHeroLayout>
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
