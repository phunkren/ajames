import { createStitches } from "@stitches/react";
import {
  gray,
  blue,
  red,
  green,
  orange,
  slate,
  sky,
  grayDark,
  blueDark,
  redDark,
  greenDark,
  orangeDark,
  slateDark,
  skyDark,
  yellow,
  yellowDark,
  tomato,
  tomatoDark,
  amber,
  amberDark,
  grass,
  grassDark,
  plum,
  plumDark,
  pink,
  pinkDark,
  brown,
  brownDark,
  gold,
  goldDark,
  teal,
  tealDark,
  indigo,
  indigoDark,
  sage,
  sageDark,
  blackA,
  whiteA,
  crimson,
  crimsonDark,
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
    shadows: {
      1: `0px 2px 1px -1px ${blackA.blackA6}, 0px 1px 1px 0px ${blackA.blackA7}, 0px 1px 3px 0px ${blackA.blackA8}`, // Cards, Buttons
      2: `0px 3px 1px -2px ${blackA.blackA6}, 0px 2px 2px 0px ${blackA.blackA7}, 0px 1px 5px 0px ${blackA.blackA8}`, // Scroll to Top, Toast
      3: `0px 3px 3px -2px ${blackA.blackA6}, 0px 3px 4px 0px ${blackA.blackA7}, 0px 1px 8px 0px ${blackA.blackA8}`, // Dialog
      4: `0px 2px 4px -1px ${blackA.blackA6}, 0px 4px 5px 0px ${blackA.blackA7}, 0px 1px 10px 0px ${blackA.blackA8}`, // :hover
      5: `0px 3px 5px -1px ${blackA.blackA6}, 0px 5px 8px 0px ${blackA.blackA7}, 0px 1px 14px 0px ${blackA.blackA8}`, // :active
      textShadow: "rgb(0 0 0 / 18%) 2px 2px",
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
    ...blackA,
    ...whiteA,
    ...gray,
    ...blue,
    ...red,
    ...green,
    ...orange,
    ...yellow,
    ...slate,
    ...sky,
    ...tomato,
    ...amber,
    ...grass,
    ...plum,
    ...pink,
    ...brown,
    ...gold,
    ...teal,
    ...indigo,
    ...sage,
    ...crimson,
  },
});

export const darkTheme = createTheme({
  colors: {
    ...DARK_THEME_COLORS,
    ...blackA,
    ...whiteA,
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...orangeDark,
    ...slateDark,
    ...skyDark,
    ...yellowDark,
    ...tomatoDark,
    ...amberDark,
    ...grassDark,
    ...plumDark,
    ...pinkDark,
    ...brownDark,
    ...goldDark,
    ...tealDark,
    ...indigoDark,
    ...sageDark,
    ...crimsonDark,
  },
});

export type { CSS } from "@stitches/react";
