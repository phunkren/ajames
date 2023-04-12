import { createStitches } from "@stitches/react";
import {
  gray,
  blue,
  red,
  slate,
  grayDark,
  blueDark,
  redDark,
  slateDark,
  yellow,
  yellowDark,
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
  blackA,
  whiteA,
  crimson,
  crimsonDark,
  sandDark,
  indigo,
  indigoDark,
  violetDark,
  sageDark,
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
      11: "80px",
      12: "120px",
    },
    shadows: {
      1: `0px 2px 4px -1px ${blackA.blackA6}, 0px 1px 2px 0px ${blackA.blackA7}, 0px 1px 2px 0px ${blackA.blackA8}`, // Cards, Buttons
      2: `0px 3px 6px -2px ${blackA.blackA6}, 0px 2px 4px 0px ${blackA.blackA7}, 0px 1px 2px 0px ${blackA.blackA8}`, // Scroll to Top, Toast
      3: `0px 3px 6px -2px ${blackA.blackA6}, 0px 3px 6px 0px ${blackA.blackA7}, 0px 1px 2px 0px ${blackA.blackA8}`, // Dialog
      4: `0px 2px 4px -1px ${blackA.blackA6}, 0px 4px 8px 0px ${blackA.blackA7}, 0px 1px 2px 0px ${blackA.blackA8}`, // :hover
      5: `0px 3px 6px -1px ${blackA.blackA6}, 0px 5px 10px 0px ${blackA.blackA7}, 0px 1px 2px 0px ${blackA.blackA8}`, // :active
      textShadow: "rgb(0 0 0 / 18%) 2px 2px",
    },
    radii: {
      1: "4px",
      2: "8px",
    },
  },
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 720px)",
    bp3: "(min-width: 1024px)",
    bp4: "(min-width: 1400px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    print: "print",
  },
  utils: {
    ...SPACING_UTILS,
  },
});

export const lightTheme = createTheme({
  colors: {
    foreground: gray.gray12,
    foregroundMuted: slate.slate12,
    background: slate.slate2,
    backgroundMuted: gray.gray1,
    backgroundGradient: `radial-gradient(circle at bottom, ${slate.slate1} 0%, ${gray.gray1} 100%)`,
    focus: crimson.crimson9,
    hover: blue.blue9,
    ...blackA,
    ...whiteA,
    ...gray,
    ...slate,
    ...red,
    ...crimson,
    ...amber,
    ...yellow,
    ...grass,
    ...blue,
    ...plum,
    ...pink,
    ...gold,
    ...brown,
  },
});

export const darkTheme = createTheme({
  colors: {
    foreground: slateDark.slate12,
    foregroundMuted: whiteA.whiteA11,
    background: slateDark.slate1,
    backgroundMuted: grayDark.gray2,
    backgroundGradient: `radial-gradient(circle at bottom, ${sageDark.sage1} 0%,  ${sageDark.sage1} 100%)`,
    focus: crimsonDark.crimson9,
    hover: blueDark.blue9,
    ...blackA,
    ...whiteA,
    ...grayDark,
    ...slateDark,
    ...redDark,
    ...crimsonDark,
    ...amberDark,
    ...yellowDark,
    ...grassDark,
    ...blueDark,
    ...plumDark,
    ...pinkDark,
    ...goldDark,
    ...brownDark,
    ...indigoDark,
  },
});

export type { CSS } from "@stitches/react";
