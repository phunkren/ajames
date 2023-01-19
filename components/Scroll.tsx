import * as ScrollArea from "@radix-ui/react-scroll-area";
import { blackA } from "@radix-ui/colors";
import { styled } from "../stitches.config";

const SCROLLBAR_SIZE = 10;

export const ScrollAreaRoot = styled(ScrollArea.Root, {
  maxWidth: "100%",
  overflow: "hidden",
});

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
  width: "100%",
});

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: blackA.blackA6,
  transition: "background 160ms ease-out",
  "&:hover": { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});

export const ScrollAreaThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: "white",
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

export const ScrollAreaCorner = styled(ScrollArea.Corner, {
  background: blackA.blackA8,
});
