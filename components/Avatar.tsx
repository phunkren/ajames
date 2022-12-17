import * as RadixAvatar from "@radix-ui/react-avatar";
import { PERSONAL } from "../data/personal";
import { styled } from "../stitches.config";

const AvatarRoot = styled(RadixAvatar.Root, {
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
});

const AvatarImage = styled(RadixAvatar.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const AvatarFallback = styled(RadixAvatar.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: "white",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
});

export function Avatar() {
  return (
    <AvatarRoot>
      <AvatarImage src="/images/avatar.png" alt={PERSONAL.name} />
      <AvatarFallback delayMs={600}>{PERSONAL.initials}</AvatarFallback>
    </AvatarRoot>
  );
}
