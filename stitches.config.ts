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
