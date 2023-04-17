import { ComponentProps, memo } from "react";
import { styled } from "../stitches.config";
import { SPACING_VARIANTS } from "../styles/spacing";
import {
  AUX_STYLES,
  H1_STYLES,
  H2_STYLES,
  H3_STYLES,
  P_STYLES,
  TEXT_VARIANTS,
} from "../styles/text";

type EmojiProps = ComponentProps<typeof StyledEmoji> & {
  emoji: string;
};

export const TextTitle1 = styled("h1", {
  ...H1_STYLES,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextTitle2 = styled("h2", {
  ...H2_STYLES,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextTitle3 = styled("h3", {
  ...H3_STYLES,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextBody = styled("p", {
  ...P_STYLES,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextHeadline = styled("span", {
  ...P_STYLES,
  fontWeight: 500,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextAux = styled("span", {
  ...AUX_STYLES,

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextTitle = styled("h1", {
  lineHeight: 1.4,
  letterSpacing: 0.72,

  "@landscape": {
    "@bp2": {
      fontSize: 48,
      lineHeight: 1.3,
      letterSpacing: 0.4,
    },

    "@bp3": {
      fontSize: 64,
    },

    "@bp4": {
      fontSize: 72,
    },
  },

  "@portrait": {
    fontSize: `calc(7.25vw)`,
    textAlign: "center",
  },

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const TextSubtitle = styled(TextHeadline, {
  "@portrait": {
    fontSize: `calc(2.5vw)`,
    textAlign: "center",
  },

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

export const StyledEmoji = styled("span", {
  display: "block",
  fontSize: 48,
  lineHeight: 1,
  textShadow: "$textShadow",

  variants: {
    ...SPACING_VARIANTS,
    size: {
      s: {
        fontSize: 32,
      },
      m: {
        fontSize: 44,
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
