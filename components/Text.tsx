import { HTMLAttributes } from "react";
import { styled } from "../stitches.config";
import { H1_STYLES, H2_STYLES, H3_STYLES, P_STYLES } from "../styles/text";

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
  fontSize: 18,

  "@bp2": {
    fontSize: 24,
  },
});

const StyledTextAux = styled("span", {
  fontSize: 14,
  textTransform: "uppercase",

  "@bp2": {
    fontSize: 16,
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
