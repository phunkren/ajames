import { memo } from "react";
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
  ...H1_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextTitle2 = styled("h2", {
  ...H2_STYLES,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const TextTitle3 = styled("h3", {
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
  ...P_STYLES,
  fontWeight: 500,

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const MarkdownTitle = styled(TextTitle2, {
  paddingTop: "$10",
});

export const TextAux = styled("span", {
  ...AUX_STYLES,

  "@print": {
    fontWeight: 400,
  },

  variants: {
    ...TEXT_VARIANTS,
  },
});

export const StyledEmoji = styled("span", {
  display: "block",
  fontSize: 48,
  lineHeight: 1,
  textShadow: "$textShadow",

  variants: {
    size: {
      s: {
        fontSize: 32,
      },
      l: {
        fontSize: 64,
      },
    },
  },
});

export const Emoji = memo(function Emoji({ emoji, ...props }: EmojiProps) {
  return (
    <StyledEmoji aria-hidden {...props}>
      {emoji}
    </StyledEmoji>
  );
});
