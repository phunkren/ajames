import { ComponentProps, ReactNode, Ref } from "react";
import { Box } from "../components/Layout";
import { CSS } from "../stitches.config";
import { Tag } from "./notion";

type ChildProps = {
  ref: Ref<HTMLAnchorElement>;
  isPreviewVisible: boolean;
  onPreviewToggle: (pressed: boolean) => void;
};

export type CardProps = ComponentProps<typeof Box> &
  CSS & {
    image: string;
    children: (props: ChildProps) => ReactNode;
  };

export type BlogCardProps = CardProps & {
  url: string;
  image: string;
  description: string;
  title: string;
  emoji: string;
  tags: Tag[];
};

export type VideoCardProps = CardProps & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  description?: string;
  css: any;
};
