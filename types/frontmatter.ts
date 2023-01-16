import { ComponentProps } from "react";
import { Box } from "../components/Layout";
import { CSS } from "../stitches.config";
import { Tag } from "./notion";

export type FrontmatterProps = ComponentProps<typeof Box> & CSS;

export type PostTagProps = FrontmatterProps & {
  tags: Tag[];
  icon?: boolean;
};

export type ActiveTagsProps = FrontmatterProps & {
  tags: Tag[];
  queryTags: string[];
  icon?: boolean;
};

export type PublishProps = FrontmatterProps & {
  date: string;
  icon?: boolean;
  compact?: boolean;
};

export type TotalProps = FrontmatterProps & {
  total: number;
  icon?: boolean;
};

export type BlogFrontmatter = {
  title: string;
  description: string;
  cover: string;
  emoji: string;
  date: string;
  time: number;
  tags: Tag[];
  canonical?: string;
};
