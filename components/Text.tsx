import { styled } from "../stitches.config";
import {
  AUX_STYLES,
  H1_STYLES,
  H2_STYLES,
  H3_STYLES,
  P_STYLES,
  TEXT_VARIANTS,
} from "../styles/text";

export const TextTitle1 = styled("h1", {
  ...H1_STYLES,
  ...TEXT_VARIANTS,
});

export const TextTitle2 = styled("h2", {
  ...H2_STYLES,
  ...TEXT_VARIANTS,
});

export const TextTitle3 = styled("h3", {
  ...H3_STYLES,
  ...TEXT_VARIANTS,
});

export const TextBody = styled("p", {
  ...P_STYLES,
  ...TEXT_VARIANTS,
});

export const TextHeadline = styled("span", {
  ...P_STYLES,
  ...TEXT_VARIANTS,
});

export const TextAux = styled("span", {
  ...AUX_STYLES,
  ...TEXT_VARIANTS,
});

const StyledEmoji = styled("span", {
  display: "block",
  fontSize: 32,
  lineHeight: 1,

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

export function Emoji({ emoji, ...props }) {
  return (
    <StyledEmoji aria-hidden {...props}>
      {emoji}
    </StyledEmoji>
  );
}
