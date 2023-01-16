import { memo } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { PERSONAL } from "../util/data";
import { styled } from "../stitches.config";

export const AvatarRoot = styled(RadixAvatar.Root, {
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 48,
  height: 48,
  borderRadius: "100%",
  backgroundColor: "black",
  boxShadow: "$1",

  "&:hover": {
    boxShadow: "$4",
  },

  "&:active": {
    boxShadow: "$5",
  },
});

export const AvatarImage = styled(RadixAvatar.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

export const AvatarFallback = styled(RadixAvatar.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "black",
  color: "white",
});

export const Avatar = memo(function Avatar(props: RadixAvatar.AvatarProps) {
  return (
    <AvatarRoot {...props}>
      <AvatarImage src="/images/avatar.png" alt={PERSONAL.name} />
      <AvatarFallback delayMs={600}>{PERSONAL.initials}</AvatarFallback>
    </AvatarRoot>
  );
});
