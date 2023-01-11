export const TEXT_VARIANTS = {
  variants: {
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
  fontSize: 22,

  "@bp3": {
    fontSize: 24,
  },

  "@print": {
    fontSize: 16,
  },
};

export const P_STYLES = {
  fontSize: 18,

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
  color: "$foregroundMuted",

  "@bp2": {
    fontSize: 16,
  },

  "@print": {
    fontSize: 12,
  },
};
