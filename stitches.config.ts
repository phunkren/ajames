import { createStitches } from "@stitches/react";
import {
  gray,
  blue,
  red,
  green,
  orange,
  slate,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  orangeDark,
  slateDark,
  whiteA,
  blackA,
} from "@radix-ui/colors";
import { SPACING_UTILS } from "./styles/spacing";
import { DISPLAY_UTILS } from "./styles/display";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "./styles/color";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    space: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 720px)",
    bp3: "(min-width: 1080px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    print: "print",
  },
  utils: {
    ...SPACING_UTILS,
    ...DISPLAY_UTILS,
  },
});

export const lightTheme = createTheme({
  colors: {
    ...LIGHT_THEME_COLORS,
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...orange,
    ...slate,
  },
  shadows: {
    verticalOffset: `0 2px 4px ${blackA.blackA8}`,
  },
});

export const darkTheme = createTheme({
  colors: {
    ...DARK_THEME_COLORS,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...slateDark,
  },
  shadows: {
    verticalOffset: `0 2px 4px ${whiteA.whiteA6}`,
  },
});

export type { CSS } from "@stitches/react";
