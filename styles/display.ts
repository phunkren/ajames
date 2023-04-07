export const DISPLAY_UTILS = {
  op: (value: number) => ({
    opacity: value,
  }),
};

export const DISPLAY_VARIANTS = {
  display: {
    none: {
      display: "none",
    },
    initial: {
      display: "initial",
    },
    block: {
      display: "block",
    },
    flex: {
      display: "flex",
    },
    grid: {
      display: "grid",
    },
    contents: {
      display: "contents",
    },
  },
  position: {
    static: {
      position: "static",
    },
    relative: {
      position: "relative",
    },
    absolute: {
      position: "absolute",
    },
  },
  visibility: {
    hidden: {
      visibility: "hidden",
    },
    visible: {
      visibility: "visible",
    },
  },
  container: {
    s: { width: "100%", maxWidth: 720, margin: "0 auto" },
    m: { width: "100%", maxWidth: 900, margin: "0 auto" },
    l: { width: "100%", maxWidth: 1200, margin: "0 auto" },
    xl: { width: "100%", maxWidth: 1800, margin: "0 auto" },
  },
};
