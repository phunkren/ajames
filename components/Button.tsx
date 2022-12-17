import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  transparent?: boolean;
};

export function Button(props: ButtonProps) {
  return <button type="button" {...props} />;
}
