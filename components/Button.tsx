import { ButtonHTMLAttributes, forwardRef, Ref } from "react";
import { styled } from "../stitches.config";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
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

export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return <StyledButton ref={ref} type="button" {...props} />;
  }
);
