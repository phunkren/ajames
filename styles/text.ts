import { lightTheme } from "../stitches.config";

export const TEXT_VARIANTS = {
  color: {
    primary: {
      color: "$foregound",
    },
    secondary: {
      color: "$foregroundMuted",
    },
    inherit: {
      color: "inherit",
    },
  },
  textAlign: {
    left: {
      textAlign: "left",
    },
    right: {
      textAlign: "right",
    },
    center: {
      textAlign: "center",
    },
    justify: {
      textAlign: "justify",
    },
  },
  textDecoration: {
    none: {
      textDecoration: "none",
    },
    underline: {
      textDecoration: "underline",
    },
    dotted: {
      textDecoration: "dotted",
    },
  },
  textTransform: {
    uppercase: {
      textTransform: "uppercase",
    },
    lowercase: {
      textTransform: "lowercase",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    initial: {
      textTransform: "initial",
    },
  },
  fontStyle: {
    normal: {
      fontStyle: "normal",
    },
    oblique: {
      fontStyle: "oblique",
    },
    italic: {
      fontStyle: "italic",
    },
  },
  fontWeight: {
    [300]: {
      fontWeight: 300,
    },
    [400]: {
      fontWeight: 400,
    },
    [500]: {
      fontWeight: 500,
    },
  },
  clamp: {
    [1]: {
      display: "-webkit-box",
      ["-webkit-line-clamp"]: "1",
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
    },
    [2]: {
      display: "-webkit-box",
      ["-webkit-line-clamp"]: "2",
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
    },
    [3]: {
      display: "-webkit-box",
      ["-webkit-line-clamp"]: "3",
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
    },
    [4]: {
      display: "-webkit-box",
      ["-webkit-line-clamp"]: "4",
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
    },
    [5]: {
      display: "-webkit-box",
      ["-webkit-line-clamp"]: "5",
      ["-webkit-box-orient"]: "vertical",
      overflow: "hidden",
    },
  },
};

export const H1_STYLES = {
  fontSize: 36,

  "@bp2": {
    fontSize: 48,
  },

  "@bp3": {
    fontSize: 72,
  },

  "@print": {
    fontSize: 24,
  },
};

export const H2_STYLES = {
  fontSize: 24,

  "@bp2": {
    fontSize: 36,
  },

  "@bp3": {
    fontSize: 48,
  },

  "@print": {
    fontSize: 18,
  },
};

export const H3_STYLES = {
  fontSize: 18,

  "@bp3": {
    fontSize: 22,
  },

  "@print": {
    fontSize: 16,
  },
};

export const P_STYLES = {
  fontSize: 18,

  [`.${lightTheme} &`]: {
    fontWeight: 400,
  },

  "@bp2": {
    fontSize: 22,
  },

  "@print": {
    fontSize: 14,
    lineHeight: 1.25,
  },
};

export const AUX_STYLES = {
  fontSize: 14,

  "@bp2": {
    fontSize: 16,
  },

  "@print": {
    fontSize: 12,
  },
};
