import { HTMLAttributes } from "react";
import { styled } from "../stitches.config";

type HeaderProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

type ParapgraphProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: "p";
};

type SpanProps = HTMLAttributes<HTMLSpanElement> & {
  as?: "span";
};

type TextProps = ParapgraphProps | SpanProps;

const StyledTextTitle1 = styled("h1", {
  fontSize: 36,

  "@bp2": {
    fontSize: 48,
  },

  "@bp3": {
    fontSize: 72,
  },
});

const StyledTextTitle2 = styled("h2", {
  fontSize: 24,

  "@bp2": {
    fontSize: 36,
  },

  "@bp3": {
    fontSize: 48,
  },
});

const StyledTextTitle3 = styled("h3", {
  fontSize: 18,

  "@bp2": {
    fontSize: 24,
  },

  "@bp3": {
    fontSize: 36,
  },
});

const StyledTextBody = styled("p", {
  fontSize: 16,

  "@bp2": {
    fontSize: 18,
  },
});

const StyledTextHeadline = styled("span", {
  fontSize: 18,

  "@bp2": {
    fontSize: 24,
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
