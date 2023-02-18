import { ButtonHTMLAttributes } from "react";
import { CSS } from "../stitches.config";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & CSS;

export type ShareButtonProps = ButtonProps & {
  url: string;
  text: string;
  emoji?: string;
  variant?: string;
};

export type FilterClearProps = ButtonProps & {
  filter?: string;
};

export type FilterMenuProps = ButtonProps & {
  open: boolean;
};
