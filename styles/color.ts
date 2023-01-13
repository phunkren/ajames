import {
  gray,
  slate,
  grayDark,
  slateDark,
  whiteA,
  blackA,
} from "@radix-ui/colors";

export const LIGHT_THEME_COLORS = {
  foreground: slate.slate12,
  foregroundMuted: gray.gray11,
  background: gray.gray1,
  backgroundMuted: slate.slate2,
};

export const DARK_THEME_COLORS = {
  foreground: whiteA.whiteA12,
  foregroundMuted: grayDark.gray11,
  background: slateDark.slate1,
  backgroundMuted: grayDark.gray2,
};

export const LIGHT_THEME_SHADOW_VERTICAL_OFFSET = `0 2px 4px ${blackA.blackA8}`;

export const DARK_THEME_SHADOW_VERTICAL_OFFSET = `0 2px 4px ${whiteA.whiteA8}`;
