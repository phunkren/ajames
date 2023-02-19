import { ComponentProps, forwardRef, memo, Ref } from "react";
import { styled } from "../stitches.config";
import { DISPLAY_VARIANTS } from "../styles/display";
import { FLEX_VARIANTS } from "../styles/flex";
import { SPACING_VARIANTS } from "../styles/spacing";

const StyledBox = styled("div", {
  display: "flex",
  flexDirection: "row",

  variants: { ...FLEX_VARIANTS, ...SPACING_VARIANTS, ...DISPLAY_VARIANTS },
});

export const Box = memo(
  forwardRef((props: any, ref: Ref<HTMLDivElement>) => {
    return <StyledBox ref={ref} {...props} />;
  })
);
