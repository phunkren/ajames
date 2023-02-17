import {
  gray,
  slate,
  grayDark,
  slateDark,
  sandDark,
  crimson,
} from "@radix-ui/colors";

export const LIGHT_THEME_COLORS = {
  foreground: gray.gray12,
  foregroundMuted: slate.slate12,
  background: slate.slate2,
  backgroundMuted: gray.gray1,
  backgroundGradient: `radial-gradient(circle at bottom, ${slate.slate2} 0%, ${gray.gray2} 100%)`,
  focus: crimson.crimson8,
};

export const DARK_THEME_COLORS = {
  foreground: slateDark.slate12,
  foregroundMuted: grayDark.gray11,
  background: slateDark.slate1,
  backgroundMuted: grayDark.gray2,
  backgroundGradient: `radial-gradient(circle at bottom, ${slateDark.slate1} 0%, ${sandDark.sand1} 100%)`,
  focus: crimson.crimson8,
};
