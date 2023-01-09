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
        borderColor: tomato.tomato10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: tomatoDark.tomato10,
      },
    },
    orange: {
      [`${lightTheme.selector} &`]: {
        borderColor: amber.amber10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: amberDark.amber10,
      },
    },
    yellow: {
      [`${lightTheme.selector} &`]: {
        borderColor: yellow.yellow10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: yellowDark.yellow10,
      },
    },
    green: {
      [`${lightTheme.selector} &`]: {
        borderColor: grass.grass10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: grassDark.grass10,
      },
    },
    blue: {
      [`${lightTheme.selector} &`]: {
        borderColor: sky.sky10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: skyDark.sky10,
      },
    },
    purple: {
      [`${lightTheme.selector} &`]: {
        borderColor: plum.plum10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: plumDark.plum10,
      },
    },
    pink: {
      [`${lightTheme.selector} &`]: {
        borderColor: pink.pink10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: pinkDark.pink10,
      },
    },
    gray: {
      [`${lightTheme.selector} &`]: {
        borderColor: slate.slate10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: slateDark.slate10,
      },
    },
    brown: {
      [`${lightTheme.selector} &`]: {
        borderColor: brown.brown10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: brownDark.brown10,
      },
    },
    default: {
      [`${lightTheme.selector} &`]: {
        borderColor: gold.gold10,
      },

      [`${darkTheme.selector} &`]: {
        borderColor: goldDark.gold10,
      },
    },
  },
};
