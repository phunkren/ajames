import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { memo } from "react";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { Divider } from "./Divider";
import { Box } from "./Box";
import { TextAux } from "./Text";
import { blackA, whiteA } from "@radix-ui/colors";

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
  textTransform: "uppercase",
  padding: "$2",
  boxShadow: "$1",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
  transition:
    "background 200ms ease-out, opacity 200ms ease-out, box-shadow 200ms ease-out",

  [`.${darkTheme} &`]: {
    backgroundColor: whiteA.whiteA2,
  },

  [`.${darkTheme} &:hover`]: {
    backgroundColor: whiteA.whiteA3,
    boxShadow: "$4",
  },

  [`.${darkTheme} &:active`]: {
    backgroundColor: whiteA.whiteA4,
    boxShadow: "$5",
  },

  [`.${lightTheme} &`]: {
    backgroundColor: blackA.blackA2,
  },

  [`.${lightTheme} &:hover`]: {
    backgroundColor: blackA.blackA3,
    boxShadow: "$4",
  },

  [`.${lightTheme} &:active`]: {
    backgroundColor: blackA.blackA4,
    boxShadow: "$5",
  },

  "&:active": {
    boxShadow: "$5",
  },

  variants: {
    ...NOTION_TAG_VARIANTS,
    active: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0.4,

        "&:hover": {
          opacity: 0.75,
        },
      },
    },
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
  transition: "opacity 75ms ease-out",

  "&:hover": {
    opacity: 0.75,
  },

  "&[data-state=on]": {
    opacity: 1,
    cursor: "default",
    transition: "opacity 0 ease-out",
  },
});

export const TagToggle = memo(function TagToggle({
  tags,
  value,
  ...props
}: TagProps) {
  return (
    <TagToggleRoot
      aria-label="Blog tag toggle"
      orientation="horizontal"
      value={value}
      {...props}
    >
      {tags.map((tag) => (
        <TagToggleItem
          key={tag.id}
          value={tag.name}
          borderColor={tag.color}
          active={!value.length || value.includes(tag.name)}
        >
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
