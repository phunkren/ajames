import { blackA } from "@radix-ui/colors";
import { globalCss } from "../stitches.config";
import {
  DARK_THEME_COLORS,
  DARK_THEME_SHADOW_VERTICAL_OFFSET,
  LIGHT_THEME_COLORS,
  LIGHT_THEME_SHADOW_VERTICAL_OFFSET,
} from "./color";
import { AUX_STYLES, H1_STYLES, H2_STYLES, H3_STYLES, P_STYLES } from "./text";

/* https://piccalil.li/blog/a-modern-css-reset/ */
export const globalStyles = globalCss({
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  /* Remove default margin */
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd, a": {
    margin: 0,
    lineHeight: 1.5,
  },

  /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
  "ul[role='list'], ol[role='list']": {
    listStyle: "none",
  },

  /* Set core root defaults */
  "html:focus-within": {
    scrollBehavior: "smooth",
  },

  /* Set core body defaults */
  body: {
    display: "flex",
    flexDirection: "column",
    textRendering: "optimizeSpeed",
    lineHeight: "1.5",
    width: "100%",
    minHeight: "100dvh",
    overflowX: "hidden",
    ...P_STYLES,
  },

  "div#__next, div#__root": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  "body[data-theme='light']": {
    background: `radial-gradient(circle at top, ${LIGHT_THEME_COLORS.background} 0%, ${LIGHT_THEME_COLORS.backgroundMuted} 100%)`,
    color: LIGHT_THEME_COLORS.foreground,
  },

  "body[data-theme='dark']": {
    background: `radial-gradient(circle at top, ${DARK_THEME_COLORS.backgroundMuted} 0%, ${DARK_THEME_COLORS.background} 100%)`,
    color: DARK_THEME_COLORS.foreground,
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

  // Blog post styling
  article: {
    h1: H1_STYLES,
    h2: H2_STYLES,
    h3: H3_STYLES,
    p: P_STYLES,
    img: {
      margin: "0 auto",
    },

    "body[data-theme='light'] &": {
      "img, pre": {
        boxShadow: LIGHT_THEME_SHADOW_VERTICAL_OFFSET,
      },
    },

    "body[data-theme='dark'] &": {
      "img, pre": {
        boxShadow: DARK_THEME_SHADOW_VERTICAL_OFFSET,
      },
    },
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

  "@print": {
    body: {
      background: "white",
      color: "red",
    },

    blockquote: {
      lineHeight: 1,
    },
  },
});
