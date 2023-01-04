import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
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
import { Button, ScrollToTopButton } from "./Button";

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

const StyledImage = styled(Image, {
  objectFit: "cover",
});

// These magic numbers are calculated based on the font size of the TextTitle1 component
// The computed value is (fontSize * lineHeight) / 2.
const StyledContent = styled(Box, {
  position: "relative",
  top: -27,

  "@bp2": {
    top: -36,
  },

  "@bp3": {
    top: -54,
  },
});

export function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <Box
      id="__root"
      direction="vertical"
      className={theme}
      css={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      {children}
    </Box>
  );
}

export function HeaderLayout() {
  return (
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
  );
}

export function Layout({ children }) {
  return (
    <Box
      direction="vertical"
      spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
      flexGrow
    >
      <HeaderLayout />

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

export function BlogLayout({ hero, children }) {
  return (
    <Box direction="vertical" spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}>
      <Box direction="vertical">
        <HeaderLayout />

        <AspectRatio.Root ratio={16 / 9}>
          <StyledImage src={hero} alt="" fill />
        </AspectRatio.Root>
      </Box>

      <StyledContent as="main" direction="vertical" flexGrow>
        {children}
      </StyledContent>

      <Box
        as="footer"
        direction="horizontal"
        spacingVertical={{ "@initial": 4, "@bp2": 7 }}
        justifyContent="center"
      >
        {/* social sharing (social-media-specific, or copy to clipboard button) */}
        <Social />
      </Box>

      <ScrollToTopButton />
    </Box>
  );
}

export function Box(props) {
  return <StyledBox {...props} />;
}
