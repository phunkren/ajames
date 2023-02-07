import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { memo, useCallback } from "react";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { TextAux } from "./Text";
import { blackA, whiteA } from "@radix-ui/colors";
import { FilterMenuButton } from "./Button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";
import { Box } from "./Box";

type TagDropdownItemProps = DropdownMenu.DropdownMenuCheckboxItemProps & Tag;

const StyledDropdownMenuContent = styled(DropdownMenu.Content, {
  background: "$backgroundMuted",
  borderRadius: 4,
  spacing: "$2",
  boxShadow: "$2",
  zIndex: 10,

  "&:hover": {
    boxShadow: "$4",
  },
});

const StyledDropdownMenuItem = styled(DropdownMenu.CheckboxItem, {
  flexGrow: 1,
  padding: "$2",
  borderRadius: 4,

  [`.${darkTheme} &:hover`]: {
    backgroundColor: whiteA.whiteA3,
  },

  [`.${lightTheme} &:hover`]: {
    backgroundColor: blackA.blackA3,
  },
});

export const StyledTag = styled(Box, {
  position: "relative",
  display: "flex",
  alignitems: "center",
  justifyContent: "center",
  padding: "$1 $2",
  borderRadius: 4,
  borderStyle: "solid",
  borderWidth: 1,
  textTransform: "uppercase",
  color: "$foregroundMuted",

  "& > *": {
    zIndex: 1,
  },

  "&::after": {
    content: "",
    position: "absolute",
    inset: -1,
    backgroundColor: "$background",
    opacity: 0.4,
    borderRadius: 4,
  },

  [`${TextAux}`]: {
    lineHeight: 1,
  },

  variants: {
    ...NOTION_TAG_VARIANTS,
  },
});

export const TagDropdown = memo(function TagDropdown(props: any) {
  const { theme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <FilterMenuButton />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <StyledDropdownMenuContent className={theme}>
          {props.children}

          <DropdownMenu.Arrow />
        </StyledDropdownMenuContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
});

export const TagDropdownItem = memo(function TagDropdownItem({
  id,
  children,
  color,
  checked,
  name,
  onSelect,
  ...props
}: TagDropdownItemProps) {
  const handleSelect = useCallback(
    (e: Event) => {
      e.preventDefault();
      onSelect?.(e);
    },
    [onSelect]
  );

  return (
    <StyledDropdownMenuItem id={id} onSelect={handleSelect} {...props}>
      <DropdownMenu.ItemIndicator>
        <CheckIcon />
      </DropdownMenu.ItemIndicator>
      <StyledTag borderColor={color}>
        <TextAux textTransform="uppercase">{name}</TextAux>
      </StyledTag>
    </StyledDropdownMenuItem>
  );
});
