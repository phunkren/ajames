import { useTheme } from "../hooks/useTheme";
import { styled } from "../stitches.config";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";
import { Navigation } from "./Navigation";
import { Social } from "./Social";
import { ThemeToggle } from "./Theme";

const StyledHStack = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS },
});

const StyledVStack = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS },
});

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS },
});

export function RootLayout({ children }) {
  const theme = useTheme();

  return (
    <VStack
      id="__root"
      className={theme}
      css={{ maxWidth: "1440px", margin: "0 auto" }}
    >
      {children}
    </VStack>
  );
}

export function Layout({ children }) {
  return (
    <VStack css={{ flexGrow: 1 }}>
      <HStack as="header" spacing={3} gap={2} justifyContent="space-between">
        <Navigation />
        <ThemeToggle />
      </HStack>

      <VStack
        as="main"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        css={{ flexGrow: 1 }}
      >
        {children}
      </VStack>

      <HStack as="footer" spacing={3} justifyContent="center">
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
