import { blackA } from "@radix-ui/colors";
import { globalCss } from "../stitches.config";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "./color";
import { AUX_STYLES, P_STYLES } from "./text";
import { Alexandria, Jost, Fira_Code } from "@next/font/google";

export const alexandria = Alexandria({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-alex",
});

export const jost = Jost({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const firaCode = Fira_Code({
  weight: ["300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-fira",
});

/* https://piccalil.li/blog/a-modern-css-reset/ */
export const globalStyles = globalCss({
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  /* Set core root defaults */
  "html:focus-within": {
    scrollBehavior: "smooth",
  },

  "div#__next, div#__root": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  /* Set core body defaults */
  body: {
    display: "flex",
    flexDirection: "column",
    textRendering: "optimizeLegibility",
    lineHeight: "1.5",
    width: "100%",
    minHeight: "100dvh",
    overflowX: "hidden",
    fontWeight: 300,
    ...P_STYLES,
  },

  /* Remove default margin */
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd, a": {
    margin: 0,
    lineHeight: 1.5,
  },

  "body[data-theme='light']": {
    background: LIGHT_THEME_COLORS.backgroundGradient,
    color: LIGHT_THEME_COLORS.foreground,
  },

  "body[data-theme='dark']": {
    background: DARK_THEME_COLORS.backgroundGradient,
    color: DARK_THEME_COLORS.foreground,
  },

  "h1, h2, h3": {
    fontWeight: 400,
  },

  "a, button": {
    fontweight: 500,
  },

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  "ul[role='list'], ol[role='list']": {
    listStyle: "none",
  },

  /* A elements that don't have a class get default styles */
  "a:not([class])": { textDecorationSkipInk: "auto" },

  /* Make images easier to work with */
  "img, picture": {
    maxWidth: "100%",
    display: "block",
  },

  /* Inherit fonts for inputs and buttons */
  "input, button, textarea, select": {
    font: "inherit",
    fontWeight: 500,
  },

  /* Come at me bro */
  "button:hover": {
    cursor: "pointer",
  },
  "blockquote:before": {
    content: "open-quote",
  },

  "blockquote:after": {
    content: "close-quote",
  },

  // Default code block styling
  code: {
    background: blackA.blackA10,
    color: "white",
    paddingTop: 0,
    paddingRight: "$1",
    paddingBottom: 0,
    paddingLeft: "$1",
    ...AUX_STYLES,
  },

  pre: {
    code: {
      ...AUX_STYLES,
      display: "block",

      whiteSpace: "pre-wrap",
      minWidth: "100px",
      maxWidth: "100%",
      padding: "$4",
      borderRadius: 4,
      textAlign: "left",
    },
  },

  /* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
  "@reducedMotion": {
    "html:focus-within": {
      scrollBehavior: "auto",
    },

    "*, *::before, *::after": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
      scrollBehavior: "auto !important",
    },
  },
});
