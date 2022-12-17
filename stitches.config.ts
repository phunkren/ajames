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
} from "@radix-ui/colors";
import { SPACING_UTILS } from "./styles/spacing";

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
      0.5: "4px",
      1: "8px",
      2: "12px",
      3: "16px",
      4: "20px",
      5: "24px",
      6: "28px",
      7: "32px",
      8: "36px",
      9: "40px",
      10: "48px",
    },
  },
  media: {
    phone: "(min-width: 480px)",
    tablet: "(min-width: 720px)",
    desktop: "(min-width: 1080px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
  utils: {
    ...SPACING_UTILS,
  },
});

export const lightTheme = createTheme({
  colors: {
    white: "#fefefe",
    black: "#010101",
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...orange,
    ...slate,
  },
});

export const darkTheme = createTheme({
  colors: {
    white: "#fefefe",
    black: "#010101",
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...slateDark,
  },
});
