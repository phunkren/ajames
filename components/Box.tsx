import { forwardRef, memo, Ref } from "react";
import { CSS, styled } from "../stitches.config";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";

type BoxBaseProps = any; // ComponentProps<typeof StyledBox>;

export type BoxProps = BoxBaseProps &
  CSS & {
    as?: string;
  };

const StyledBox = styled("div", {
  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },

  defaultVariants: {
    display: "flex",
  },
});

export const Box = memo(
  forwardRef(function Box(props: BoxProps, ref: Ref<HTMLDivElement>) {
    return <StyledBox ref={ref} {...props} />;
  })
);
