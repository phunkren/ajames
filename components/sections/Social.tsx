import { css } from "../../stitches.config";
import { TextTitle1 } from "../Text";
import { Box } from "../Box";

const bg = css({
  position: "relative",
  background: `$slate1`,

  "&::before": {
    content: "",
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: "50%",
    backgroundColor: `$slate1`,
    transform: "skewY(-2deg)",
    transformOrigin: "left top",
    zIndex: "$0",
  },
});

export const SOCIAL_ID = "social";

export const Social = () => {
  return (
    <Box
      as="section"
      display="none"
      direction="vertical"
      spacingTop={{ "@initial": 11, "@bp2": 10, "@bp3": 11 }}
      spacingHorizontal={7}
      className={bg}
    >
      <Box
        direction="vertical"
        gap={12}
        container="l"
        spacingBottom={{ "@print": 0, "@initial": 10, "@bp2": 11 }}
        css={{ zIndex: "$1" }}
      >
        <TextTitle1>WIP</TextTitle1>
      </Box>
    </Box>
  );
};
