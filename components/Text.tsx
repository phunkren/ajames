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

type Props = HeaderProps | ParapgraphProps | SpanProps;

const StyledText = styled("span", {});

export function Text({ as, ...props }: Props) {
  return <StyledText as={as} {...props} />;
}
