import { ReactNode, Ref } from "react";
import { CSS } from "../stitches.config";
import { Tag } from "./notion";

export type CardChildProps = {
  ref: Ref<HTMLAnchorElement>;
  isPreviewVisible: boolean;
  onPreviewToggle: (pressed: boolean) => void;
};

export type CardProps = {
  image: string;
  children: (props: CardChildProps) => ReactNode;
};

export type BlogCardProps = CSS & {
  url: string;
  image: string;
  description: string;
  title: string;
  emoji: string;
  tags: Tag[];
};

export type VideoCardProps = CSS & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  description?: string;
  css: any;
};
