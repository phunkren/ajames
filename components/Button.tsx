import { ButtonHTMLAttributes } from "react";
import { styled } from "../stitches.config";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  transparent?: boolean;
};

const StyledButton = styled("button", {
  appearance: "none",
  background: "none",
  border: "none",
  color: "inherit",
  font: "inherit",
  overflow: "visible",
  padding: "0",
  "line-height": "normal",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
});

export function Button(props: ButtonProps) {
  return <StyledButton type="button" {...props} />;
}
