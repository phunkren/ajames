import { SpacingUnit } from "../types/spacing";

export const SPACING_UTILS = {
  spacing: (value: string) => ({
    padding: value,
  }),
  spacingHorizontal: (value: string) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  spacingVertical: (value: string) => ({
    paddingTop: value,
    paddingBottom: value,
  }),
  spacingStart: (value: string) => ({
    paddingLeft: value,
  }),
  spacingEnd: (value: string) => ({
    paddingRight: value,
  }),
};

export const SPACING_VARIANTS = {
  spacing: {
    [0.5]: {
      spacing: "$space$0.5",
    },
    [1]: {
      spacing: "$space$1",
    },
    [2]: {
      spacing: "$space$2",
    },
    [3]: {
      spacing: "$space$3",
    },
    [4]: {
      spacing: "$space$4",
    },
    [5]: {
      spacing: "$space$5",
    },
    [6]: {
      spacing: "$space$6",
    },
    [7]: {
      spacing: "$space$7",
    },
    [8]: {
      spacing: "$space$8",
    },
    [9]: {
      spacing: "$space$9",
    },
    [10]: {
      spacing: "$space$10",
    },
  },
  spacingHorizontal: {
    [0.5]: {
      spacingHorizontal: "$space$0.5",
    },
    [1]: {
      spacingHorizontal: "$space$1",
    },
    [2]: {
      spacingHorizontal: "$space$2",
    },
    [3]: {
      spacingHorizontal: "$space$3",
    },
    [4]: {
      spacingHorizontal: "$space$4",
    },
    [5]: {
      spacingHorizontal: "$space$5",
    },
    [6]: {
      spacingHorizontal: "$space$6",
    },
    [7]: {
      spacingHorizontal: "$space$7",
    },
    [8]: {
      spacingHorizontal: "$space$8",
    },
    [9]: {
      spacingHorizontal: "$space$9",
    },
    [10]: {
      spacingHorizontal: "$space$10",
    },
  },
  spacingVertical: {
    [0.5]: {
      spacingVertical: "$space$0.5",
    },
    [1]: {
      spacingVertical: "$space$1",
    },
    [2]: {
      spacingVertical: "$space$2",
    },
    [3]: {
      spacingVertical: "$space$3",
    },
    [4]: {
      spacingVertical: "$space$4",
    },
    [5]: {
      spacingVertical: "$space$5",
    },
    [6]: {
      spacingVertical: "$space$6",
    },
    [7]: {
      spacingVertical: "$space$7",
    },
    [8]: {
      spacingVertical: "$space$8",
    },
    [9]: {
      spacingVertical: "$space$9",
    },
    [10]: {
      spacingVertical: "$space$10",
    },
  },
  spacingStart: {
    [0.5]: {
      spacingStart: "$space$0.5",
    },
    [1]: {
      spacingStart: "$space$1",
    },
    [2]: {
      spacingStart: "$space$2",
    },
    [3]: {
      spacingStart: "$space$3",
    },
    [4]: {
      spacingStart: "$space$4",
    },
    [5]: {
      spacingStart: "$space$5",
    },
    [6]: {
      spacingStart: "$space$6",
    },
    [7]: {
      spacingStart: "$space$7",
    },
    [8]: {
      spacingStart: "$space$8",
    },
    [9]: {
      spacingStart: "$space$9",
    },
    [10]: {
      spacingStart: "$space$10",
    },
  },
  spacingEnd: {
    [0.5]: {
      spacingEnd: "$space$0.5",
    },
    [1]: {
      spacingEnd: "$space$1",
    },
    [2]: {
      spacingEnd: "$space$2",
    },
    [3]: {
      spacingEnd: "$space$3",
    },
    [4]: {
      spacingEnd: "$space$4",
    },
    [5]: {
      spacingEnd: "$space$5",
    },
    [6]: {
      spacingEnd: "$space$6",
    },
    [7]: {
      spacingEnd: "$space$7",
    },
    [8]: {
      spacingEnd: "$space$8",
    },
    [9]: {
      spacingEnd: "$space$9",
    },
    [10]: {
      spacingEnd: "$space$10",
    },
  },
};
