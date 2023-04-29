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
  orange,
  orangeDark,
  indigo,
  indigoDark,
  violetDark,
  sageDark,
  violet,
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
      textShadow: "rgb(0 0 0 / 28%) 2px 2px",
    },
    radii: {
      1: "4px",
      2: "8px",
    },
    transitions: {
      durationDefault: "250ms",
      durationQuick: "200ms",
      durationNone: "0s",
      functionDefault: "ease",
      functionFancy: "cubic-bezier(0.4, 0, 1, 1)",
      transformScale: "0.975",
    },
    zIndices: {
      0: "0", //
      1: "50", // Raised Content
      2: "100", // Header
      3: "150", // Dropdown Menu / Tooltip
      4: "200", // Drawer / Dialog
      5: "250", // Toast
    },
  },
  media: {
    bp1: "(min-width: 480px)",
    bp2: "(min-width: 720px)",
    bp3: "(min-width: 1024px)",
    bp4: "(min-width: 1400px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
    landscape: "(orientation: landscape)",
    portrait: "(orientation: portrait)",
    print: "print",
  },
  utils: {
    ...SPACING_UTILS,
  },
});

export const lightTheme = createTheme({
  colors: {
    foreground: gray.gray12,
    foregroundMuted: gray.gray12,
    background: slate.slate2,
    backgroundMuted: gray.gray1,
    focus: crimson.crimson10,
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
    ...violet,
    ...indigo,
    ...orange,
  },
});

export const darkTheme = createTheme({
  colors: {
    foreground: slateDark.slate12,
    foregroundMuted: whiteA.whiteA11,
    background: slateDark.slate1,
    backgroundMuted: grayDark.gray2,
    focus: crimsonDark.crimson11,
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
    ...violetDark,
    ...orangeDark,
  },
});

export type { CSS } from "@stitches/react";
