import { memo, ReactElement } from "react";
import Image, { StaticImageData } from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { blueDark, redDark } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { Link, StyledIconLink } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Toggle";
import { Box } from "./Box";
import { PageSeo } from "./SEO";
import { TextAux, TextHeadline, TextTitle1 } from "./Text";
import { IconButton } from "./Button";
import { Logo } from "./Logo";
import { Tooltip } from "./Tooltip";

type LayoutProps = {
  children: ReactElement;
};

type HeroLayoutProps = {
  children?: ReactElement;
  src?: StaticImageData;
  bordered?: boolean;
};

const StyledHeroLayout = styled(Box, {
  width: "100vw",
  position: "relative",
  overflow: "hidden",
  margin: "$4 0",
  left: "-$2",
  borderRadius: 0,

  [`.${lightTheme} &::before`]: {
    content: "",
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundColor: "rgba(0,0,0,0.66)",
  },

  "&::after": {
    content: "",
    position: "absolute",
    inset: 0,
    zIndex: 0,
    background: "rgba(0,0,0,0.15)",
  },

  "@bp2": {
    left: "-$7",
    margin: "$10 0",
  },

  "@bp3": {
    left: 0,
    width: "100%",
    borderRadius: "$1",
  },
});

const StyledHeroContainer = styled(Box, {
  position: "relative",
  borderRadius: 0,

  [`.${lightTheme} &`]: {
    color: lightTheme.colors.background,

    [`${TextTitle1}, ${TextHeadline}`]: {
      color: "inherit",
    },

    [`${IconButton}, ${StyledIconLink}`]: {
      color: "inherit",
      borderColor: "inherit",

      "@media(hover)": {
        "&:hover": {
          background: darkTheme.colors.foreground,
          borderColor: darkTheme.colors.foreground,
        },

        "&:hover svg": {
          color: darkTheme.colors.background,
        },
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
          background: "$foregroundMuted",
          borderRadius: 0,
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
    borderRadius: "$1",
  },
});

const StyledFilter = styled(Box, {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  background: `conic-gradient(from -25deg, ${redDark.red2}, ${redDark.red4}, ${redDark.red6}, ${redDark.red8}, ${blueDark.blue2}, ${blueDark.blue6}, ${blueDark.blue8})`,

  [`.${darkTheme} &`]: {
    filter: "blur(50px)",
    opacity: 0.5,
  },

  [`.${lightTheme} &`]: {
    filter: "blur(50px)",
  },
});

export const HeaderLayout = memo(function HeaderLayout() {
  return (
    <Box
      as="header"
      position="relative"
      display={{ "@print": "none", "@initial": "flex" }}
      spacingHorizontal={{ "@initial": 4, "@bp2": 9 }}
      spacingVertical={10}
      gap={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="space-between"
      alignItems="center"
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
  );
});

export const FooterLayout = memo(function FooterLayout() {
  return (
    <Box
      as="footer"
      spacingVertical={10}
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
        spacingHorizontal={{ "@initial": 2, "@bp2": 7 }}
        css={{ overflowX: "hidden", "@bp3": { overflowX: "visible" } }}
        container="l"
        className={theme}
      >
        <HeaderLayout />

        <Box
          as="main"
          direction="vertical"
          spacingBottom={{ "@print": 4, "@bp2": 10 }}
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
}: HeroLayoutProps) {
  return (
    <StyledHeroLayout>
      <AspectRatio.Root ratio={2.5 / 1} asChild>
        <StyledHeroContainer direction="vertical" bordered={bordered} flexGrow>
          <StyledFilter />

          {src ? <StyledImage src={src} alt="" fill priority /> : null}

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

export const LoadingLayout = memo(function LoadingLayout() {
  return (
    <Box direction="vertical">
      <TextAux>Loading...</TextAux>
    </Box>
  );
});
