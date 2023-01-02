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
};
