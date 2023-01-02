import { blackA } from "@radix-ui/colors";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { styled } from "../stitches.config";
import { Tag } from "../types/notion";

type Props = {
  tags: Tag[];
  value?: string; // tag.id
  onChange: (tag: any) => void;
};
const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  height: 35,
  width: 70,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  color: "white",

  backgroundColor: "transparent",
  opacity: 0.4,

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

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&[data-state=on]": {
    opacity: 1,
    backgroundColor: "red",
  },

  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },

  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

export function TagToggle({ tags, value, onChange }: Props) {
  return (
    <ToggleGroupRoot
      type="single"
      aria-label="Tag toggle"
      orientation="horizontal"
      value={value}
      onValueChange={onChange}
    >
      {tags.map((tag) => (
        <ToggleGroupItem
          key={tag.id}
          value={tag.id}
          backgroundColor={tag.color}
        >
          {tag.name} ({tag.count})
        </ToggleGroupItem>
      ))}
    </ToggleGroupRoot>
  );
}
