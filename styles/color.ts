import { gray, slate, grayDark, slateDark } from "@radix-ui/colors";

export const LIGHT_THEME_COLORS = {
  foreground: slate.slate12,
  foregroundMuted: gray.gray11,
  background: slate.slate2,
  backgroundMuted: gray.gray1,
  backgroundGradient: `radial-gradient(circle at top, ${slate.slate4} 0%, ${gray.gray4} 100%)`,
};

export const DARK_THEME_COLORS = {
  foreground: slateDark.slate12,
  foregroundMuted: grayDark.gray11,
  background: slateDark.slate1,
  backgroundMuted: grayDark.gray2,
  backgroundGradient: `radial-gradient(circle at top, ${slateDark.slate1} 0%, ${grayDark.gray1} 100%)`,
};
