import { memo, ReactElement, useState } from "react";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { blueDark, redDark, slateDark, slateDarkA } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social, SocialExtended } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box, BoxProps } from "./Box";
import { PageSeo } from "./SEO";
import { TextAux, TextSubtitle, TextTitle } from "./Text";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";
import headshot from "../public/images/headshot.png";
import { PERSONAL } from "../util/data";
import { useScroll } from "../hooks/useScroll";
import { useRouter } from "next/router";
import { hslToRgba } from "../util/images";

type LayoutProps = {
  children: ReactElement;
};

const StyledHeroLayout = styled(Box, {
  height: "100svh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  color: "$foreground",

  "@supports not (height: 100svh)": {
    height: "100vh",
  },

  "@print": {
    display: "none !important",
  },
});

const StyledHeroContainer = styled(Box, {
  background: slateDark.slate1,
  color: slateDark.slate12,
  overflow: "hidden",

  "@print": {
    display: "none !important",
  },
});

const StyledImage = styled(Image, {
  position: "absolute",
  height: "90svh",
  bottom: 0,
  right: 0,
  transition:
    "filter $transitions$durationDefault $transitions$functionDefault",
  pointerEvents: "none",
  objectPosition: "bottom",
  zIndex: 6,

  "@supports not (height: 100svh)": {
    height: "90vh",
  },

  "@landscape": {
    objectFit: "contain",
    right: "5%",
    transform: "translateX(25%)",

    "@bp4": {
      right: "22.5%",
    },
  },

  "@portrait": {
    objectFit: "cover",
    width: "100%",
  },

  [`.${darkTheme} &`]: {
    filter: "brightness(66%)",
  },

  [`.${lightTheme} &`]: {
    filter: "brightness(75%)",
  },
});

const HeroOne = styled(Box, {
  position: "absolute",
  filter: "blur(400px)",

  width: "33vw",
  height: "110vh",
  left: "17vw",
  top: "-10vh",
  transformOrigin: "top left",
  transform: "rotate(33deg)",
  background: `linear-gradient(-45deg, ${hslToRgba(
    blueDark.blue3
  )} 0%, ${hslToRgba(blueDark.blue4)} 50%, ${hslToRgba(blueDark.blue5)} 100%)`,
  backgroundImage: `-webkit-linear-gradient(-45deg, ${hslToRgba(
    blueDark.blue3
  )} 0%, ${hslToRgba(blueDark.blue4)} 50%, ${hslToRgba(blueDark.blue5)} 100%)`,
  zIndex: 1,
});

const HeroTwo = styled(Box, {
  position: "absolute",
  filter: "blur(400px)",

  width: "33vw",
  height: "117vh",
  left: "20vw",
  top: "5vh",
  background: `linear-gradient(240deg, ${hslToRgba(
    blueDark.blue9
  )} 0%, ${hslToRgba(blueDark.blue7)} 50%, ${hslToRgba(blueDark.blue5)} 100%)`,
  backgroundImage: `-webkit-linear-gradient(240deg, ${hslToRgba(
    blueDark.blue9
  )} 0%, ${hslToRgba(blueDark.blue7)} 50%, ${hslToRgba(blueDark.blue5)} 100%)`,
  transformOrigin: "top left",
  transform: "rotate(-45deg)",
  zIndex: 2,
});

const HeroThree = styled(Box, {
  position: "absolute",
  filter: "blur(400px)",

  top: "95vh",
  left: "36vw",
  width: "28vw",
  height: "34vh",
  background: `linear-gradient(140deg, ${hslToRgba(
    redDark.red11
  )} 0%, ${hslToRgba(redDark.red9)} 50%,  ${hslToRgba(redDark.red7)} 100%)`,
  backgroundImage: `-webkit-linear-gradient(140deg, ${hslToRgba(
    redDark.red11
  )} 0%, ${hslToRgba(redDark.red9)} 50%,  ${hslToRgba(redDark.red7)} 100%)`,
  transformOrigin: "bottom left",
  transform: "rotate(-45deg)",
  zIndex: 3,
});

const HeroFour = styled(Box, {
  position: "absolute",
  filter: "blur(400px)",

  top: "-50vh",
  left: "45vw",
  width: "33vw",
  height: "124vh",
  background: `linear-gradient(33deg, ${hslToRgba(
    redDark.red3
  )} 0%, ${hslToRgba(redDark.red4)} 50%, ${hslToRgba(redDark.red5)} 100%)`,
  backgroundImage: `-webkit-linear-gradient(33deg, ${hslToRgba(
    redDark.red3
  )} 0%, ${hslToRgba(redDark.red4)} 50%, ${hslToRgba(redDark.red5)} 100%)`,
  transformOrigin: "bottom left",
  transform: "rotate(45deg)",
  zIndex: 4,
});

const HeaderBox = styled(Box, {
  zIndex: 50,
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
        spacingRight={5}
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
      <Social gap="6" />
      <SocialExtended gap="6" />
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
        css={{
          "@print": { overflow: "visible" },
          "@initial": { overflowX: "hidden" },
          "@bp3": { overflowX: "visible" },
        }}
        className={theme}
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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <StyledHeroLayout>
      <StyledHeroContainer direction="vertical" flexGrow>
        <HeroOne />
        <HeroTwo />
        <HeroThree />
        <HeroFour />

        <StyledImage
          src={headshot}
          alt=""
          placeholder={!isLoaded ? "blur" : "empty"}
          sizes="(max-width: 1020px) 100vw, 1276px"
          priority
          onLoad={() => setIsLoaded(true)}
        />
        <Box
          direction="vertical"
          spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
          flexGrow
        >
          <Box direction="vertical" position="relative" flexGrow>
            <Box direction="vertical" container="l" flexGrow>
              <Box
                direction="vertical"
                spacingBottom={4}
                justifyContent={{
                  "@portrait": "flex-end",
                  "@landscape": "center",
                }}
                alignItems={{
                  "@portrait": "center",
                  "@landscape": "flex-start",
                }}
                css={{ zIndex: 6 }}
                flexGrow
              >
                <TextTitle
                  color="currentColor"
                  css={{ textShadow: "$textShadow" }}
                >
                  {PERSONAL.name}
                </TextTitle>

                <TextSubtitle
                  color="currentColor"
                  css={{ textShadow: "$textShadow" }}
                >
                  {PERSONAL.occupation} / {PERSONAL.location}
                </TextSubtitle>

                <Box position="relative" spacingTop={4} css={{ left: "-$1" }}>
                  <Social
                    size={{
                      "@initial": "m",
                      "@bp2": "l",
                      "@bp3": "m",
                    }}
                    gap="3"
                  />
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
