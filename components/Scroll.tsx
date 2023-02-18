import * as ScrollArea from "@radix-ui/react-scroll-area";
import { styled } from "../stitches.config";
import { memo } from "react";
import { useTheme } from "../hooks/useTheme";
import { blueDark, redDark } from "@radix-ui/colors";

const SCROLLBAR_SIZE = 12;

type ScrollBarProps = ScrollArea.ScrollAreaScrollbarProps & {
  thumb?: "phunk" | "boring";
};

export const StyledThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  position: "relative",
  borderRadius: SCROLLBAR_SIZE,

  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
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

  variants: {
    thumb: {
      phunk: {
        background: `linear-gradient(-45deg, ${redDark.red4}, ${redDark.red6}, ${blueDark.blue4}, ${blueDark.blue6})`,
      },
      boring: {
        background: "$foregroundMuted",
        opacity: 0.25,
      },
    },
  },

  defaultVariants: {
    thumb: "boring",
  },
});

export const StyledScrollbar = styled(ScrollArea.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: "$backgroundMuted",
  boxShadow: "$2",

  '&[data-orientation="vertical"]': {
    width: SCROLLBAR_SIZE,
  },

  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },

  "&:hover": {
    boxShadow: "$4",
  },

  "&:active": {
    boxShadow: "$5",
  },

  [`&:hover > ${StyledThumb}`]: {
    cursor: "grab",
  },

  [`&:active, &:active > ${StyledThumb}`]: {
    cursor: "grabbing",
  },
});

export const Scrollbar = memo(function Scrollbar({
  thumb,
  ...props
}: ScrollBarProps) {
  const { theme } = useTheme();

  return (
    <StyledScrollbar className={theme} {...props}>
      <StyledThumb thumb={thumb} />
    </StyledScrollbar>
  );
});

export const CardScrollRoot = styled(ScrollArea.Root, {
  maxWidth: "100%",
  overflowY: "hidden",
});

export const CardScrollViewport = styled(ScrollArea.Viewport, {
  scrollSnapType: "x mandatory",
  scrollPadding: "0 $1",
});
