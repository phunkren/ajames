import { styled } from "../stitches.config";
import {
  AUX_STYLES,
  H1_STYLES,
  H2_STYLES,
  H3_STYLES,
  P_STYLES,
  TEXT_VARIANTS,
} from "../styles/text";
import { EmojiProps } from "../types/emoji";

export const TextTitle1 = styled("h1", {
  fontWeight: 400,
  ...H1_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextTitle2 = styled("h2", {
  fontWeight: 500,
  ...H2_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextTitle3 = styled("h3", {
  fontWeight: 500,
  ...H3_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextBody = styled("p", {
  ...P_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextHeadline = styled("span", {
  fontWeight: 500,
  ...P_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextAux = styled("span", {
  fontWeight: 500,
  ...AUX_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const StyledEmoji = styled("span", {
  display: "block",
  fontSize: 32,
  lineHeight: 1,
  textShadow: "$textShadow",

  variants: {
    size: {
      s: {
        fontSize: 24,
      },
      l: {
        fontSize: 64,
      },
    },
  },
});

export function Emoji({ emoji, ...props }: EmojiProps) {
  return (
    <StyledEmoji aria-hidden {...props}>
      {emoji}
    </StyledEmoji>
  );
}
