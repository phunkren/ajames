export type SpacingUnit =
  | "0.5"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11";

export const FLEX_UTILS = {
  gap: (value: SpacingUnit) => ({
    flexGap: value,
  }),
};

export const FLEX_VARIANTS = {
  flexGrow: {
    true: {
      flexGrow: "1",
    },
    false: {
      flexGrow: "0",
    },
  },
  flexShrink: {
    true: {
      flexShrink: "1",
    },
    false: {
      flexShrink: "0",
    },
  },
  flexWrap: {
    wrap: {
      flexWrap: "wrap",
    },
    wrapReverse: {
      flexWrap: "wrap-reverse",
    },
    nowrap: {
      flexWrap: "nowrap",
    },
  },
  alignItems: {
    "flex-start": {
      alignItems: "flex-start",
    },
    "flex-end": {
      alignItems: "flex-end",
    },
    center: {
      alignItems: "center",
    },
  },
  justifyContent: {
    center: {
      justifyContent: "center",
    },
    "flex-start": {
      justifyContent: "flex-start",
    },
    "flex-end": {
      justifyContent: "flex-end",
    },
    "space-between": {
      justifyContent: "space-between",
    },
    "space-around": {
      justifyContent: "space-around",
    },
  },
  gap: {
    [0]: {
      gap: 0,
    },
    [1]: {
      gap: "$space$1",
    },
    [2]: {
      gap: "$space$2",
    },
    [3]: {
      gap: "$space$3",
    },
    [4]: {
      gap: "$space$4",
    },
    [5]: {
      gap: "$space$5",
    },
    [6]: {
      gap: "$space$6",
    },
    [7]: {
      gap: "$space$7",
    },
    [8]: {
      gap: "$space$8",
    },
    [9]: {
      gap: "$space$9",
    },
    [10]: {
      gap: "$space$10",
    },
    [11]: {
      gap: "$space$11",
    },
  },
  direction: {
    horizontal: {
      flexDirection: "row",
    },
    vertical: {
      flexDirection: "column",
      width: "100%",
    },
  },
};
