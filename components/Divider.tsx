import * as Separator from "@radix-ui/react-separator";
import { memo } from "react";
import { styled } from "../stitches.config";

type Props = Separator.SeparatorProps & {
  variant?: "primary" | "secondary";
};

const StyledSeparator = styled(Separator.Root, {
  boxShadow: "$1",

  "&[data-orientation=horizontal]": { height: 2, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 2 },

  "@print": {
    border: "1px solid black",
  },

  variants: {
    variant: {
      primary: {
        background: `linear-gradient(-45deg, $red4, $red6, $blue4, $blue6)`,
      },
      secondary: {
        backgroundColor: "$foregroundMuted",
        opacity: 0.25,
      },
    },
  },

  defaultVariants: {
    variant: "secondary",
  },
});

export const Divider = memo(function Divider(props: Props) {
  return <StyledSeparator orientation="horizontal" decorative {...props} />;
});
