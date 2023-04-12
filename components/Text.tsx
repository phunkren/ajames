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
import { Link } from "./Link";

type EmojiProps = ComponentProps<typeof StyledEmoji> & {
  emoji: string;
};

type MarkDownProps = {
  children: string[];
};

export const TextTitle = styled("h1", {
  fontSize: 36,
  lineHeight: 1.4,
  letterSpacing: 0.72,

  "@bp2": {
    fontSize: 64,
    lineHeight: 1.3,
    letterSpacing: 0.4,
  },

  variants: {
    ...TEXT_VARIANTS,
    ...SPACING_VARIANTS,
  },
});

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

const StyledMarkdownLinkH2 = styled(Link, {
  width: "fit-content",
  marginTop: "$10",
  marginBottom: "$5",
});

export const MarkdownH2 = memo(function MarkdownH2(props: MarkDownProps) {
  const title = props.children[0];
  const id = title.toLowerCase().split(" ").join("-");

  return (
    <StyledMarkdownLinkH2 href={`#${id}`} variant="primary">
      <TextTitle2 id={id}>{title}</TextTitle2>
    </StyledMarkdownLinkH2>
  );
});

const StyledMarkdownLinkH3 = styled(Link, {
  width: "fit-content",
  marginTop: "$6",
  marginBottom: "$3",
});

export const MarkdownH3 = memo(function MarkdownH3(props: MarkDownProps) {
  const title = props.children[0];
  const id = title.toLowerCase().split(" ").join("-");

  return (
    <StyledMarkdownLinkH3 id={id} href={`#${id}`} variant="secondary">
      <TextTitle3>{title}</TextTitle3>
    </StyledMarkdownLinkH3>
  );
});

export const TextAux = styled("span", {
  ...AUX_STYLES,

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
