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
  gridColumnGap: "$2",
  gridRowGap: "$2",
  borderRadius: 4,
  width: "100%",
  maxWidth: 1100,
  margin: "0 auto",

  "@bp2": {
    gridTemplateColumns: "repeat(4, 1fr)",
    gridColumnGap: "$4",
    gridRowGap: "$4",
  },

  "@bp3": {
    gridTemplateColumns: "repeat(6, 1fr)",
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
  borderRadius: 4,
  border: "1px solid",

  variants: {
    borderColor: {
      red: {
        borderColor: "red",
      },
      orange: {
        borderColor: "orange",
      },
      yellow: {
        borderColor: "yellow",
      },
      green: {
        borderColor: "green",
      },
      blue: {
        borderColor: "blue",
      },
      purple: {
        borderColor: "purple",
      },
      pink: {
        borderColor: "pink",
      },
      gray: {
        borderColor: "gray",
      },
      brown: {
        borderColor: "brown",
      },
      default: {
        borderColor: "black",
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
        <ToggleGroupItem key={tag.id} value={tag.name} borderColor={tag.color}>
          <TextAux>
            {tag.name} ({tag.count})
          </TextAux>
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
}
