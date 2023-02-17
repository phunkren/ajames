import { globalCss } from "../stitches.config";
import { DARK_THEME_COLORS, LIGHT_THEME_COLORS } from "./color";
import { AUX_STYLES, P_STYLES } from "./text";

/* https://piccalil.li/blog/a-modern-css-reset/ */
export const globalStyles = globalCss({
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  "*:focus": {
    borderRadius: 4,
    outline: "2px solid $crimson7",
    outlineOffset: 2,
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
    backgroundBlendMode: "multiply",
    width: "100%",
    minHeight: "100dvh",
    overflowX: "hidden",
    ...P_STYLES,
  },

  /* block scroll when the mobile nav is open */
  "body:has(#mobileNav[data-state=open])": {
    overflow: "hidden",
  },

  /* Remove default margin */
  "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd, a": {
    margin: 0,
  },

  "body[data-theme='light']": {
    background: LIGHT_THEME_COLORS.backgroundGradient,
    color: LIGHT_THEME_COLORS.foreground,
  },

  "body[data-theme='dark']": {
    background: DARK_THEME_COLORS.backgroundGradient,
    color: DARK_THEME_COLORS.foreground,
  },

  "a, button": {
    fontWeight: 500,
    letterSpacing: "0.32px",
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
    ...P_STYLES,
    lineHeight: "inherit",
  },

  pre: {
    code: {
      ...AUX_STYLES,
      display: "block",
      minWidth: "100px",
      maxWidth: "100%",
      whiteSpace: "pre !important",
      overflowX: "auto",
      padding: "$4",
      borderRadius: 4,
      textAlign: "left",
      lineHeight: "inherit",
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
    "*, *::before, *::after": {
      background: "white !important",
      borderColor: "black !important",
      color: "black !important",
    },
  },
});
