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

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

export function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <Box
      id="__root"
      direction="vertical"
      className={theme}
      css={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      {children}
    </Box>
  );
}

export function Layout({ children }) {
  return (
    <Box
      direction="vertical"
      spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
      flexGrow
    >
      <Box
        as="header"
        direction="horizontal"
        spacingVertical={{ "@initial": 4, "@bp2": 7 }}
        spacingHorizontal={2}
        gap={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box direction="horizontal" gap={7} alignItems="center">
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

      <Box as="main" direction="vertical" flexGrow>
        {children}
      </Box>

      <Box
        as="footer"
        direction="horizontal"
        spacingVertical={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="center"
      >
        <Social />
      </Box>
    </Box>
  );
}

export function Box(props) {
  return <StyledBox {...props} />;
}
