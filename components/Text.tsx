import { HTMLAttributes } from "react";
import { styled, CSS } from "../stitches.config";
import {
  AUX_STYLES,
  H1_STYLES,
  H2_STYLES,
  H3_STYLES,
  P_STYLES,
} from "../styles/text";

type HeaderProps = HTMLAttributes<HTMLHeadingElement> &
  CSS & {
    as?: "h1" | "h2" | "h3";
  };

type ParapgraphProps = HTMLAttributes<HTMLParagraphElement> &
  CSS & {
    as?: "p";
  };

type SpanProps = HTMLAttributes<HTMLSpanElement> &
  CSS & {
    as?: "span";
  };

type TimeProps = HTMLAttributes<HTMLTimeElement> &
  CSS & {
    as?: "time";
  };

type TextProps = ParapgraphProps | SpanProps | TimeProps;

const StyledTextTitle1 = styled("h1", {
  ...H1_STYLES,
});

const StyledTextTitle2 = styled("h2", {
  ...H2_STYLES,
});

const StyledTextTitle3 = styled("h3", {
  ...H3_STYLES,
});

const StyledTextBody = styled("p", {
  ...P_STYLES,
});

const StyledTextHeadline = styled("span", {
  ...P_STYLES,
});

const StyledTextAux = styled("span", {
  ...AUX_STYLES,
  textTransform: "uppercase",
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
        fontSize: 72,
      },
    },
  },
});

export function TextTitle1({ as, ...props }: HeaderProps) {
  return <StyledTextTitle1 as={as} {...props} />;
}

export function TextTitle2({ as, ...props }: HeaderProps) {
  return <StyledTextTitle2 as={as} {...props} />;
}

export function TextTitle3({ as, ...props }: HeaderProps) {
  return <StyledTextTitle3 as={as} {...props} />;
}

export function TextBody({ as, ...props }: TextProps) {
  return <StyledTextBody as={as} {...props} />;
}

export function TextHeadline({ as, ...props }: TextProps) {
  return <StyledTextHeadline as={as} {...props} />;
}

export function TextAux({ as, ...props }: TextProps) {
  return <StyledTextAux as={as} {...props} />;
}

export function Emoji({ emoji, ...props }) {
  return (
    <StyledEmoji aria-hidden {...props}>
      {emoji}
    </StyledEmoji>
  );
}
