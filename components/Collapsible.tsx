import { memo, useCallback, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { styled } from "@stitches/react";
import { keyframes, CSS } from "../stitches.config";

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: "var(--radix-collapsible-content-height)" },
});

const slideUp = keyframes({
  from: { height: "var(--radix-collapsible-content-height)" },
  to: { height: 0 },
});

export const StyledCollapsibleRoot = styled(Collapsible.Root, {});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {});

export const CollapsibleContent = styled(Collapsible.Content, {
  overflow: "hidden",

  "&[data-state='open']": {
    animation: `${slideDown} $transitions$durationDefault $transitions$functionDefault`,
  },

  "&[data-state='closed']": {
    animation: `${slideUp} $transitions$durationDefault $transitions$functionDefault`,
  },
});

export const CollapsibleRoot = memo(function Collapsible(
  props: Collapsible.CollapsibleProps & CSS
) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  return (
    <StyledCollapsibleRoot
      open={open}
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
});
