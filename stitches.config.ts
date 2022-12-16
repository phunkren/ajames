import { createStitches } from "@stitches/react";
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";

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
    fonts: {
      untitled: "'Impact', sans-serif",
    },
  },
  media: {
    phone: "(min-width: 480px)",
    tablet: "(min-width: 720px)",
    desktop: "(min-width: 1080px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    darkMode: "(prefers-color-scheme: dark)",
    lightMode: "(prefers-color-scheme: light)",
  },
  utils: {
    spacingX: (value) => ({ paddingLeft: value, paddingRight: value }),
    spacingY: (value) => ({ paddingTop: value, paddingBottom: value }),
  },
});

export const lightTheme = createTheme({
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
});

export const darkTheme = createTheme({
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
});
