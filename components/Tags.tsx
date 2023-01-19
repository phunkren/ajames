import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { memo } from "react";
import { styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { Divider } from "./Divider";
import { Box } from "./Box";
import { TextAux } from "./Text";

type TagProps = ToggleGroup.ToggleGroupMultipleProps & {
  tags: Tag[];
};

const TagToggleRoot = styled(ToggleGroup.Root, {
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

const TagToggleItem = styled(ToggleGroup.Item, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  opacity: 0.4,
  textTransform: "uppercase",
  padding: "$2",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",

  "&:hover": {
    opacity: 0.75,
    boxShadow: "$4",
  },

  "&:active": {
    boxShadow: "$5",
  },

  "&[data-state=on]": {
    opacity: 1,
  },

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

const PageToggleRoot = styled(ToggleGroup.Root, {
  display: "flex",
  gap: "$5",
});

const PageToggleItem = styled(ToggleGroup.Item, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  opacity: 0.4,
  textTransform: "uppercase",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",

  "&:hover": {
    opacity: 0.75,
  },

  "&[data-state=on]": {
    opacity: 1,
    cursor: "default",
  },
});

export const TagToggle = memo(function TagToggle({ tags, ...props }: TagProps) {
  return (
    <TagToggleRoot
      aria-label="Blog tag toggle"
      orientation="horizontal"
      {...props}
    >
      {tags.map((tag) => (
        <TagToggleItem key={tag.id} value={tag.name} borderColor={tag.color}>
          <TextAux textTransform="uppercase">
            {tag.name} ({tag.count})
          </TextAux>
        </TagToggleItem>
      ))}
    </TagToggleRoot>
  );
});

export const PageToggle = memo(function PageToggle(
  props: ToggleGroup.ToggleGroupSingleProps
) {
  return (
    <PageToggleRoot aria-label="Nav toggle" orientation="horizontal" {...props}>
      <PageToggleItem value="short">
        <TextAux textTransform="capitalize">Short</TextAux>
      </PageToggleItem>

      <Box>
        <Divider orientation="vertical" />
      </Box>

      <PageToggleItem value="long">
        <TextAux textTransform="capitalize">Long</TextAux>
      </PageToggleItem>
    </PageToggleRoot>
  );
});
