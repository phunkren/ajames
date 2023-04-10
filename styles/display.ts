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
    s: {
      width: "100%",
      maxWidth: 720,
      margin: "0 auto",
      padding: "0 $1",
      "@bp2": { padding: "0 $1" },
    },
    m: {
      width: "100%",
      maxWidth: 900,
      margin: "0 auto",
      padding: "0 $2",
      "@bp2": { padding: "0 $4" },
    },
    l: {
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 $4",
      "@bp2": { padding: "0 $7" },
    },
    xl: {
      width: "100%",
      maxWidth: 1800,
      margin: "0 auto",
      padding: "0 $7",
      "@bp2": { padding: "0 $10" },
    },
  },
};
