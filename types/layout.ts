import { VariantProps } from "@stitches/react";
import { ComponentProps, ReactNode } from "react";
import { Box } from "../components/Layout";
import { CSS } from "../stitches.config";
import { BlogFrontmatter } from "./frontmatter";

export type BoxProps = ComponentProps<typeof Box>;

export type LayoutProps = {
  children: ReactNode;
};

export type BlogLayoutProps = LayoutProps & {
  frontmatter: BlogFrontmatter;
};
