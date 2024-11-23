import { memo } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { TextHeadline } from "./Text";
import { styled } from "../stitches.config";

type Props = Pick<RadixAvatar.AvatarImageProps, "src" | "alt"> & {
  fallback: string;
  compact?: boolean;
};

const StyledAvatarRoot = styled(RadixAvatar.Root, {
  width: 75,
  height: 75,
});

const StyledCompactAvatarRoot = styled(RadixAvatar.Root, {
  width: 50,
  height: 50,
});

const StyledAvatarImage = styled(RadixAvatar.Image, {
  borderRadius: "50%",
});

export const Avatar = memo(function Avatar({
  src,
  alt,
  fallback,
  compact,
}: Props) {
  if (compact) {
    return (
      <StyledCompactAvatarRoot>
        <StyledAvatarImage src={src} alt={alt} />
        <RadixAvatar.Fallback delayMs={600}>
          <TextHeadline>{fallback}</TextHeadline>
        </RadixAvatar.Fallback>
      </StyledCompactAvatarRoot>
    );
  }

  return (
    <StyledAvatarRoot>
      <StyledAvatarImage src={src} alt={alt} />
      <RadixAvatar.Fallback delayMs={600}>
        <TextHeadline>{fallback}</TextHeadline>
      </RadixAvatar.Fallback>
    </StyledAvatarRoot>
  );
});
