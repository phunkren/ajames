import { rgba } from "polished";
import { darkTheme, lightTheme } from "../stitches.config";

export const NOTION_TAG_VARIANTS = {
  active: {
    true: {
      opacity: 1,
    },
    false: {
      opacity: 0.4,
    },
  },
  borderColor: {
    red: {
      [`.${lightTheme} &`]: {
        borderColor: "$tomato9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$tomato9",
      },
    },
    orange: {
      [`.${lightTheme} &`]: {
        borderColor: "$amber9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$amber9",
      },
    },
    yellow: {
      [`.${lightTheme} &`]: {
        borderColor: "$yellow9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$yellow9",
      },
    },
    green: {
      [`.${lightTheme} &`]: {
        borderColor: "$grass9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$grass9",
      },
    },
    blue: {
      [`.${lightTheme} &`]: {
        borderColor: "$sky9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$sky9",
      },
    },
    purple: {
      [`.${lightTheme} &`]: {
        borderColor: "$plum9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$plum9",
      },
    },
    pink: {
      [`.${lightTheme} &`]: {
        borderColor: "$pink9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$pink9",
      },
    },
    gray: {
      [`.${lightTheme} &`]: {
        borderColor: "$slate9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$slate9",
      },
    },
    brown: {
      [`.${lightTheme} &`]: {
        borderColor: "$brown9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$brown9",
      },
    },
    default: {
      [`.${lightTheme} &`]: {
        borderColor: "$gold9",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$gold9",
      },
    },
  },
};
