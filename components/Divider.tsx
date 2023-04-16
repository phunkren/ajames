import * as Separator from "@radix-ui/react-separator";
import { memo } from "react";
import { styled } from "../stitches.config";

type Props = Separator.SeparatorProps & {
  variant?: "primary" | "secondary";
};

const StyledSeparator = styled(Separator.Root, {
  boxShadow: "$1",
  backgroundColor: "$foregroundMuted",
  opacity: 0.25,

  "&[data-orientation=horizontal]": { height: 2, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 2 },

  "@print": {
    border: "1px solid black",
  },
});

export const Divider = memo(function Divider(props: Props) {
  return <StyledSeparator orientation="horizontal" decorative {...props} />;
});
