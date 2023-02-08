import { darkTheme, lightTheme } from "../stitches.config";

export const NOTION_TAG_VARIANTS = {
  active: {
    true: {
      opacity: 1,
    },
    false: {
      opacity: 1,
    },
  },
  borderColor: {
    red: {
      [`.${lightTheme} &`]: {
        borderColor: "$tomato11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$tomato9",
      },
    },
    orange: {
      [`.${lightTheme} &`]: {
        borderColor: "$amber11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$amber9",
      },
    },
    yellow: {
      [`.${lightTheme} &`]: {
        borderColor: "$yellow11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$yellow9",
      },
    },
    green: {
      [`.${lightTheme} &`]: {
        borderColor: "$grass11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$grass9",
      },
    },
    blue: {
      [`.${lightTheme} &`]: {
        borderColor: "$sky11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$sky9",
      },
    },
    purple: {
      [`.${lightTheme} &`]: {
        borderColor: "$plum11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$plum9",
      },
    },
    pink: {
      [`.${lightTheme} &`]: {
        borderColor: "$pink11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$pink9",
      },
    },
    gray: {
      [`.${lightTheme} &`]: {
        borderColor: "$slate11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$slate9",
      },
    },
    brown: {
      [`.${lightTheme} &`]: {
        borderColor: "$brown11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$brown9",
      },
    },
    default: {
      [`.${lightTheme} &`]: {
        borderColor: "$gold11",
      },

      [`.${darkTheme} &`]: {
        borderColor: "$gold9",
      },
    },
  },
};
