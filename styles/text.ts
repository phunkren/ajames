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
      hyphens: "auto",
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
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: 0.72,

  "@bp2": {
    fontSize: 48,
    lineHeight: 1,
    letterSpacing: 0.96,
  },

  "@bp3": {
    fontSize: 72,
  },

  "@print": {
    fontSize: 24,
    lineHeight: 1.2,
    letterSpacing: 1.44,
  },
};

export const H2_STYLES = {
  fontSize: 28,
  fontWeight: 600,
  lineHeight: 1.6,
  letterSpacing: 0.56,

  "@bp2": {
    fontSize: 36,
    lineHeight: 1.4,
    letterSpacing: 0.72,
  },

  "@bp3": {
    fontSize: 48,
    letterSpacing: 0.96,
  },

  "@print": {
    fontSize: 18,
    lineHeight: 1.3,
  },
};

export const H3_STYLES = {
  fontSize: 20,
  fontWeight: 500,
  lineHeight: 1.8,
  letterSpacing: 0.4,

  "@bp3": {
    fontSize: 22,
    lineHeight: 1.6,
    letterSpacing: 0.44,
  },

  "@print": {
    fontSize: 16,
    lineHeight: 1.4,
    letterSpacing: 0.32,
  },
};

export const P_STYLES = {
  fontSize: 18,
  fontWeight: 400,
  lineHeight: 1.7,
  letterSpacing: 0.36,

  "@bp2": {
    fontSize: 20,
    lineHeight: 1.5,
    letterSpacing: 0.4,
  },

  "@print": {
    fontSize: 14,
    lineHeight: 1.3,
    letterSpacing: 0.28,
  },
};

export const AUX_STYLES = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1.6,
  letterSpacing: 0.28,

  "@print": {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: 0.24,
  },
};
