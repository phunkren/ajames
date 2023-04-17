import { forwardRef, memo, Ref } from "react";
import { styled } from "../stitches.config";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";

type BoxBaseProps = any; // ComponentProps<typeof StyledBox>;

export type BoxProps = BoxBaseProps & {
  as?: string;
};

const StyledBox = styled("div", {
  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },

  defaultVariants: {
    display: "flex",
  },
});

export const Box = memo(function Box(props: BoxProps) {
  return <StyledBox {...props} />;
});
