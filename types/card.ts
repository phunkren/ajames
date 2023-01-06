import { ReactNode, Ref } from "react";
import { CSS } from "../stitches.config";
import { Tag } from "./notion";

type ChildProps = {
  ref: Ref<HTMLAnchorElement>;
};

export type CardProps = CSS & {
  image: string;
  children: (props: ChildProps) => ReactNode;
};

export type BlogCardProps = CSS & {
  url: string;
  image: string;
  publishDate: string;
  title: string;
  emoji: string;
  readingTime: number;
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
