import { memo } from "react";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useTheme } from "../hooks/useTheme";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { BLUR_DATA_URL } from "../util/images";
import { Avatar } from "./Avatar";
import { Link, StyledIconLink } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box } from "./Box";
import { PageSeo } from "./SEO";
import { TextHeadline, TextTitle1 } from "./Text";
import { StyledIconButton } from "./Button";

const StyledHeroLayout = styled(Box, {
  width: "100vw",
  position: "relative",
  overflow: "hidden",
  margin: "$10 0",
  left: "-$2",
  borderRadius: 0,

  "&::after": {
    content: "",
    position: "absolute",
    inset: 0,
    zIndex: -1,

    [`.${darkTheme} &`]: {
      background: "rgba(0,0,0,0.15)",
    },

    [`.${lightTheme} &`]: {
      background: "rgba(0,0,0,0.5)",
    },
  },

  "@bp2": {
    left: "-$7",
  },

  "@bp3": {
    left: 0,
    width: "100%",
    borderRadius: 4,
  },
});

const StyledHeroContainer = styled(Box, {
  position: "relative",

  [`.${lightTheme} &`]: {
    color: "white",

    [`${TextTitle1}, ${TextHeadline}`]: {
      color: "inherit",
    },

    [`${StyledIconButton}, ${StyledIconLink}`]: {
      color: "inherit",
      borderColor: "inherit",

      "&:hover": {
        background: "white",
        borderColor: "white",
        color: "black",
      },
    },
  },

  variants: {
    bordered: {
      true: {
        "&::after": {
          content: "",
          position: "absolute",
          height: "$space$1",
          width: "100%",
          bottom: 0,
          left: 0,
          background: "$foreground",
          zIndex: 1,
        },
      },
    },
  },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
  borderRadius: 0,

  "@bp3": {
    borderRadius: 4,
  },
});

const StyledFilter = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: -1,
  filter: "blur(75px)",

  [`.${darkTheme} &`]: {
    background: "conic-gradient(from 50deg, $red3, $red2, $blue2, $blue4)",
  },

  [`.${lightTheme} &`]: {
    background: "conic-gradient(from 50deg, $red9, $red9, $blue10, $blue11)",
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  return (
    <Box
      as="header"
      display={{ "@print": "none", "@initial": "flex" }}
      spacingHorizontal={{ "@initial": 4, "@bp2": 0 }}
      spacingVertical={8}
      gap={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box direction="horizontal" gap={10} alignItems="center">
        <Link href="/">
          <Avatar />
        </Link>

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
  );
});

export const FooterLayout = memo(function FooterLayout() {
  return (
    <Box
      as="footer"
      spacingTop={8}
      spacingBottom={8}
      spacingHorizontal={4}
      justifyContent="center"
      css={{ marginTop: "$10", "@print": { display: "none" } }}
    >
      <Social />
    </Box>
  );
});

export const Layout = memo(function Layout({ children }: any) {
  const { theme } = useTheme();

  return (
    <>
      <PageSeo />

      <Box
        id="__root"
        direction="vertical"
        spacingHorizontal={{ "@initial": 2, "@bp2": 7 }}
        css={{ overflowX: "hidden", "@bp3": { overflowX: "visible" } }}
        container="l"
        className={theme}
      >
        <HeaderLayout />

        <Box
          as="main"
          direction="vertical"
          spacingTop={{ "@print": 4, "@bp2": 10 }}
          flexGrow
        >
          {children}
        </Box>

        <FooterLayout />
      </Box>
    </>
  );
});

export const HeroLayout = memo(function HeroLayout({
  src,
  children,
  bordered = false,
}: any) {
  return (
    <StyledHeroLayout direction="vertical">
      <AspectRatio.Root ratio={2.5 / 1} asChild>
        <StyledHeroContainer direction="vertical" bordered={bordered} flexGrow>
          <StyledFilter />

          {src ? (
            <StyledImage
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              src={src}
              alt=""
              sizes="100vw"
              fill
              priority
            />
          ) : null}

          {children ? (
            <Box
              direction="vertical"
              spacingHorizontal={{ "@initial": 6, "@bp2": 10 }}
              spacingVertical={{ "@initial": 10, "@bp2": 7 }}
              css={{
                zIndex: 1,
              }}
              flexGrow
            >
              {children}
            </Box>
          ) : null}
        </StyledHeroContainer>
      </AspectRatio.Root>
    </StyledHeroLayout>
  );
});

export const ActionButtons = memo(function ActionButtons(props: any) {
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
