import { memo, ReactElement } from "react";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { blueDark, redDark, slateDark, slateDarkA } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box, BoxProps } from "./Box";
import { PageSeo } from "./SEO";
import { TextAux, TextHeadline, TextTitle } from "./Text";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";
import banner from "../public/images/mugshot.png";
import { PERSONAL } from "../util/data";
import { useScroll } from "../hooks/useScroll";

type LayoutProps = {
  children: ReactElement;
};

const StyledHeroLayout = styled(Box, {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  color: "$foreground",

  "@print": {
    display: "none !important",
  },
});

const StyledHeroContainer = styled(Box, {
  background: "$slate1",
});

const StyledImage = styled(Image, {
  position: "absolute",
  height: "90vh",
  bottom: 0,
  right: 0,
  pointerEvents: "none",
  filter: "brightness(65%)",
  objectFit: "cover",
  objectPosition: "bottom",

  "@bp2": {
    objectFit: "contain",
  },

  "@bp3": {
    right: "7.5%",
    transform: "translateX(25%)",
  },

  "@bp4": {
    right: "22.5%",
  },
});

const StyledBox = styled(Box, {
  width: "75vw",
  position: "absolute",
  top: "-50vw",
  bottom: "-50vw",
  height: "200vw",
  filter: "blur(500px)",

  "&::after": {
    content: "",
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
  },

  variants: {
    variant: {
      one: {
        left: "20vw",
        transformOrigin: "top left",
        transform: "rotate(25deg)",
        background: `linear-gradient(270deg, ${blueDark.blue3} 0%, ${blueDark.blue4} 25%, ${blueDark.blue5} 50%, ${blueDark.blue6} 75%, ${blueDark.blue7} 100%)`,
      },
      two: {
        background: `linear-gradient(150deg, ${blueDark.blue9} 0%, ${blueDark.blue8} 25%, ${blueDark.blue7} 50%, ${blueDark.blue6} 75%, ${blueDark.blue5} 100%)`,
        left: "-20vw",
        transformOrigin: "top left",
        transform: "rotate(-35deg)",
      },
      three: {
        background: `linear-gradient(1200deg, ${redDark.red9} 0%, ${redDark.red8} 25%, ${redDark.red7} 50%, ${redDark.red6} 75%, ${redDark.red5} 100%)`,
        left: "140vw",
        top: "64vh",
        bottom: "-150vh",

        transformOrigin: "bottom left",
        transform: "rotate(-45deg)",
      },
      four: {
        background: `linear-gradient(60deg, ${redDark.red8} 0%, ${redDark.red7} 25%, ${redDark.red6} 50%, ${redDark.red5} 75%, ${redDark.red4} 100%)`,
        left: "0vw",
        transformOrigin: "bottom left",

        transform: "rotate(30deg)",
      },
    },
  },
});

const HeaderBox = styled(Box, {
  zIndex: 50,
  width: "100%",
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,

  willChange: "background-color",
  transition: "background-color 400ms ease-out",

  "@print": {
    display: "none !important",
  },

  variants: {
    opaque: {
      true: {
        backgroundColor: `${slateDark.slate1}`,
      },
      false: {
        backgroundColor: `${slateDarkA.slateA1}`,
      },
    },
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  const { isHeaderActive } = useScroll();

  return (
    <HeaderBox as="header" opaque={isHeaderActive}>
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
      spacingBottom={10}
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
        <StyledBox variant="one" />
        <StyledBox variant="two" />
        <StyledBox variant="four" />
        <StyledBox variant="three" />

        <StyledImage src={banner} alt="" sizes="100vw" quality={100} priority />

        <Box
          direction="vertical"
          spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
          flexGrow
        >
          <Box direction="vertical" position="relative" flexGrow>
            <Box direction="vertical" container="l" flexGrow>
              <Box
                direction="vertical"
                spacingTop={12}
                spacingBottom={10}
                justifyContent={{ "@initial": "flex-end", "@bp3": "center" }}
                alignItems={{ "@initial": "center", "@bp3": "flex-start" }}
                flexGrow
              >
                <TextTitle css={{ textShadow: "$textShadow" }}>
                  {PERSONAL.name}
                </TextTitle>

                <TextHeadline css={{ textShadow: "$textShadow" }}>
                  {PERSONAL.occupation} / {PERSONAL.location}
                </TextHeadline>

                <Box
                  position="relative"
                  spacingTop={{ "@initial": 2, "@bp3": 4 }}
                  css={{ "@bp2": { left: "-$2" } }}
                >
                  <Social size="m" gap="3" />
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
