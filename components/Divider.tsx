import { whiteA } from "@radix-ui/colors";
import * as Separator from "@radix-ui/react-separator";
import { styled } from "../stitches.config";

const StyledSeparator = styled(Separator.Root, {
  backgroundColor: whiteA.whiteA10,
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 1 },
});

export function Divider(props) {
  return <StyledSeparator orientation="horizontal" decorative {...props} />;
}
