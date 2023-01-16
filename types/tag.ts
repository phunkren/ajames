import { ToggleGroupMultipleProps } from "@radix-ui/react-toggle-group";
import { Tag } from "./notion";

export type TagProps = ToggleGroupMultipleProps & {
  tags: Tag[];
};
