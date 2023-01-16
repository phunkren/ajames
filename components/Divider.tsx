import { memo } from "react";
import * as Separator from "@radix-ui/react-separator";
import { CSS, styled } from "../stitches.config";

const StyledSeparator = styled(Separator.Root, {
  backgroundColor: "$foregroundMuted",
  opacity: 0.25,
  boxShadow: "$1",

  "&[data-orientation=horizontal]": { height: 2, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 2 },
});

export const Divider = memo(function Divider(
  props: Separator.SeparatorProps & CSS
) {
  return <StyledSeparator orientation="horizontal" decorative {...props} />;
});
