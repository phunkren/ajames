import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { TextAux } from "./Text";

type Props = ToggleGroup.ToggleGroupMultipleProps & {
  tags: Tag[];
};

const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "1fr",
  gridColumnGap: "$2",
  gridRowGap: "$2",
  width: "100%",
  spacingVertical: "$10",

  "@bp2": {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: "$4",
    gridRowGap: "$4",
  },

  "@bp3": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  opacity: 0.4,
  textTransform: "uppercase",
  padding: "$2",
  borderRadius: 4,
  border: "1px solid",
  boxShadow: "$verticalOffset",

  "&[data-state=on]": {
    opacity: 1,
  },

  "&:hover": {
    opacity: 0.75,
  },

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

export function TagToggle({ tags, ...props }: Props) {
  return (
    <ToggleGroupRoot
      aria-label="Blog tag toggle"
      orientation="horizontal"
      {...props}
    >
      {tags.map((tag) => (
        <ToggleGroupItem key={tag.id} value={tag.name} borderColor={tag.color}>
          <TextAux textTransform="uppercase">
            {tag.name} ({tag.count})
          </TextAux>
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
}
