import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";
import { Avatar } from "./Avatar";
import { Link } from "./Link";
import { Navigation, NavigationMobile } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";

const StyledHStack = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

const StyledVStack = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

export function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <VStack
      id="__root"
      className={theme}
      css={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      {children}
    </VStack>
  );
}

export function Layout({ children }) {
  return (
    <VStack spacingHorizontal={{ "@initial": 2, "@bp2": 4 }} flexGrow>
      <HStack
        as="header"
        spacingVertical={{ "@initial": 4, "@bp2": 7 }}
        spacingHorizontal={2}
        gap={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack gap={7} alignItems="center">
          <Link href="/">
            <Avatar />
          </Link>

          <Box display={{ "@initial": "none", "@bp2": "flex" }}>
            <Navigation />
          </Box>
        </HStack>

        <Box display={{ "@initial": "none", "@bp2": "flex" }}>
          <ThemeToggle />
        </Box>

        <Box display={{ "@initial": "flex", "@bp2": "none" }}>
          <NavigationMobile />
        </Box>
      </HStack>

      <VStack as="main" flexGrow>
        {children}
      </VStack>

      <HStack
        as="footer"
        spacingVertical={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="center"
      >
        <Social />
      </HStack>
    </VStack>
  );
}

export function HStack(props) {
  return <StyledHStack {...props} />;
}

export function VStack(props) {
  return <StyledVStack {...props} />;
}

export function Box(props) {
  return <StyledBox {...props} />;
}
