import { gray, slate, grayDark, slateDark, sky, sage } from "@radix-ui/colors";

export const LIGHT_THEME_COLORS = {
  foreground: gray.gray12,
  foregroundMuted: slate.slate12,
  background: gray.gray1,
  backgroundMuted: slate.slate2,
  backgroundGradient: `radial-gradient(ellipse at center, ${sky.sky2} 0%, ${sage.sage2} 50%, ${slate.slate2} 100%), radial-gradient(ellipse at center, ${gray.gray2} 0%, ${slate.slate2} 50%, ${sage.sage2} 100%)`,
};

export const DARK_THEME_COLORS = {
  foreground: slateDark.slate12,
  foregroundMuted: grayDark.gray11,
  background: slateDark.slate1,
  backgroundMuted: grayDark.gray2,
  backgroundGradient: `radial-gradient(circle at top, ${slateDark.slate1} 0%, ${grayDark.gray2} 100%)`,
};
