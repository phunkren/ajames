import { globalCss } from "../stitches.config";
import { H1_STYLES, H2_STYLES, H3_STYLES, P_STYLES } from "./text";

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
  },

  "div#__next, div#__root": {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  "body[data-theme='light']": {
    background: "radial-gradient(at top, #ffffff, #fefefe, #ffffff)",
  },

  "body[data-theme='dark']": {
    background: "radial-gradient(circle at top, #2b2b2b 0%, #1e1e1e 100%)",
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

  // Blog post styling
  article: {
    h1: H1_STYLES,
    h2: H2_STYLES,
    h3: H3_STYLES,
    p: P_STYLES,
  },

  // Default code block styling
  pre: {
    code: {
      display: "block",
      background: "none",
      whiteSpace: "pre-wrap",
      webkitOverflowScrolling: "touch",
      overflowX: "auto",
      maxWidth: "100%",
      minWidth: "100px",
      padding: 0,
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
