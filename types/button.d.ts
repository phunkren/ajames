import { ComponentProps } from "react";
import { StyledButton, StyledIconButton } from "../components/Button";
import { CSS } from "../stitches.config";

export type ButtonProps = ComponentProps<typeof StyledButton> & CSS;

export type IconButtonProps = ComponentProps<typeof StyledIconButton> & CSS;

export type ShareButtonProps = ButtonProps & {
  url: string;
  text: string;
  emoji?: string;
  variant?: string;
};

export type FilterClearProps = IconButtonProps & {
  filters: string[];
};

export type FilterMenuProps = IconButtonProps & {
  open: boolean;
};
