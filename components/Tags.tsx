import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { styled } from "../stitches.config";
import { Tag } from "../types/notion";
import { TextAux } from "./Text";

type Props = {
  tags: Tag[];
  value?: string; // tag.id
  onChange: (tag: any) => void;
};
const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "1fr",
  gridColumnGap: "16px",
  gridRowGap: "16px",
  borderRadius: 4,
  width: "100%",

  "@bp2": {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  backgroundColor: "transparent",
  opacity: 0.4,
  textTransform: "uppercase",
  padding: "$2",

  variants: {
    backgroundColor: {
      red: {
        backgroundColor: "red",
      },
      orange: {
        backgroundColor: "orange",
      },
      yellow: {
        backgroundColor: "yellow",
      },
      green: {
        backgroundColor: "green",
      },
      blue: {
        backgroundColor: "blue",
      },
      purple: {
        backgroundColor: "purple",
      },
      pink: {
        backgroundColor: "pink",
      },
      gray: {
        backgroundColor: "gray",
      },
      brown: {
        backgroundColor: "brown",
      },
      default: {
        backgroundColor: "black",
      },
    },
  },

  "&[data-state=on]": {
    opacity: 1,
  },
});

export function TagToggle({ tags, value, onChange }: Props) {
  return (
    <ToggleGroupRoot
      type="single"
      aria-label="Blog tag toggle"
      orientation="horizontal"
      value={value}
      onValueChange={onChange}
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          key={tag.id}
          value={tag.name}
          backgroundColor={tag.color}
        >
          <TextAux>
            {tag.name} ({tag.count})
          </TextAux>
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
}
