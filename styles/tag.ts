import {
  amber,
  amberDark,
  brown,
  brownDark,
  gold,
  goldDark,
  grass,
  grassDark,
  pink,
  pinkDark,
  plum,
  plumDark,
  red,
  sky,
  skyDark,
  slate,
  slateDark,
  tomato,
  tomatoDark,
  yellow,
  yellowDark,
} from "@radix-ui/colors";
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
      [`${lightTheme.selector} &`]: {
        borderColor: tomato.tomato9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: tomatoDark.tomato9,
      },
    },
    orange: {
      [`${lightTheme.selector} &`]: {
        borderColor: amber.amber9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: amberDark.amber9,
      },
    },
    yellow: {
      [`${lightTheme.selector} &`]: {
        borderColor: yellow.yellow9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: yellowDark.yellow9,
      },
    },
    green: {
      [`${lightTheme.selector} &`]: {
        borderColor: grass.grass9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: grassDark.grass9,
      },
    },
    blue: {
      [`${lightTheme.selector} &`]: {
        borderColor: sky.sky9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: skyDark.sky9,
      },
    },
    purple: {
      [`${lightTheme.selector} &`]: {
        borderColor: plum.plum9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: plumDark.plum9,
      },
    },
    pink: {
      [`${lightTheme.selector} &`]: {
        borderColor: pink.pink9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: pinkDark.pink9,
      },
    },
    gray: {
      [`${lightTheme.selector} &`]: {
        borderColor: slate.slate9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: slateDark.slate9,
      },
    },
    brown: {
      [`${lightTheme.selector} &`]: {
        borderColor: brown.brown9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: brownDark.brown9,
      },
    },
    default: {
      [`${lightTheme.selector} &`]: {
        borderColor: gold.gold9,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: goldDark.gold9,
      },
    },
  },
};
