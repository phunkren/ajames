import * as RadixTooltip from "@radix-ui/react-tooltip";
import { memo, ReactNode } from "react";
import { keyframes, styled } from "../stitches.config";
import { TextAux } from "./Text";

type Props = {
  title: string;
  children: ReactNode;
};

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledTooltipContent = styled(RadixTooltip.Content, {
  display: "none",

  "@media(hover)": {
    display: "flex",
    alignItems: "center",
    borderRadius: "$1",
    padding: "$2 $4",
    backgroundColor: "$backgroundMuted",
    boxShadow: "$2",
    userSelect: "none",
    zIndex: 100,
    animationDuration: "200ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const StyledTooltipArrow = styled(RadixTooltip.Arrow, {
  fill: "$backgroundMuted",
});

export const Tooltip = memo(function Tooltip({ children, title }: Props) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root delayDuration={400}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <StyledTooltipContent sideOffset={5}>
            <TextAux>{title}</TextAux>
            <StyledTooltipArrow />
          </StyledTooltipContent>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
});
