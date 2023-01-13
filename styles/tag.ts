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
      borderColor: "$tomato9",
    },
    orange: {
      borderColor: "$amber9",
    },
    yellow: {
      borderColor: "$yellow9",
    },
    green: {
      borderColor: "$grass9",
    },
    blue: {
      borderColor: "$sky9",
    },
    purple: {
      borderColor: "$plum9",
    },
    pink: {
      borderColor: "$pink9",
    },
    gray: {
      borderColor: "$slate9",
    },
    brown: {
      borderColor: "$brown9",
    },
    default: {
      borderColor: "$gold9",
    },
  },
};
