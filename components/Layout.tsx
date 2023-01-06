import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
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
import { ScrollToTopButton } from "./Button";
import { TextHeadline } from "./Text";

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
  top: -18,

  "@bp2": {
    top: -27,
  },

  "@bp3": {
    top: -36,
  },
});

export function Box(props) {
  return <StyledBox {...props} />;
}

export function RootLayout({ children }) {
  const { theme } = useTheme();

  return (
    <Box
      id="__root"
      direction="vertical"
      className={theme}
      css={{ maxWidth: "1800px", margin: "0 auto" }}
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

export function FooterLayout() {
  return (
    <Box
      as="footer"
      direction="horizontal"
      spacingVertical={{ "@initial": 4, "@bp2": 7 }}
      justifyContent="center"
    >
      <Social />
    </Box>
  );
}

export function Layout({ children }) {
  return (
    <Box
      direction="vertical"
      spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}
      gap={{ "@bp2": 10 }}
      flexGrow
    >
      <HeaderLayout />

      <Box
        as="main"
        direction="vertical"
        css={{ maxWidth: 1200, margin: "0 auto" }}
        flexGrow
      >
        {children}
      </Box>

      <FooterLayout />
    </Box>
  );
}

export function BlogLayout({ hero, children }) {
  return (
    <Box direction="vertical" spacingHorizontal={{ "@initial": 2, "@bp2": 4 }}>
      <HeaderLayout />

      <Box direction="vertical" css={{ maxWidth: 900, margin: "0 auto" }}>
        <Link href="/blog" variant="secondary">
          <Box
            alignItems="center"
            gap={2}
            spacingVertical={{ "@initial": 4, "@bp2": 7 }}
          >
            <ArrowLeftIcon width={28} height={28} aria-hidden />
            <TextHeadline>Back to blog overview</TextHeadline>
          </Box>
        </Link>

        <AspectRatio.Root ratio={3 / 1}>
          <StyledImage src={hero} alt="" sizes="100vw" fill priority />
        </AspectRatio.Root>

        <StyledContent as="main" direction="vertical">
          {children}
        </StyledContent>

        <FooterLayout />
      </Box>

      <ScrollToTopButton />
    </Box>
  );
}
