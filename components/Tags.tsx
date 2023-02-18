import { memo, useCallback, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { Tag } from "../types/notion";
import { TextAux, TextTitle3 } from "./Text";
import { blackA, whiteA } from "@radix-ui/colors";
import { Button, CloseButton, FilterMenuButton } from "./Button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useTheme } from "../hooks/useTheme";
import { Box } from "./Box";
import { DrawerScrollRoot, DrawerScrollViewport, Scrollbar } from "./Scroll";

type TagDropdownItemProps = DropdownMenu.DropdownMenuCheckboxItemProps & Tag;

const dialogSlideUp = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" },
});

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

const StyledDialogContent = styled(Dialog.Content, {
  position: "fixed",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$backgroundMuted",
  boxShadow: "$3",
  height: "50vh",
  minHeight: 300,
  width: "100dvw",
  borderRadius: 0,
  minWidth: 300,
  zIndex: 99,
  transition: "right 3s ease-out",
  transform: "translateY(100%)",
  animation: `${dialogSlideUp} 200ms ease-out forwards`,

  "&[data-state=open]": {
    left: 0,
  },
});

const StyledTagGrid = styled("ul", {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "repeat(auto, 1fr)",
  gridColumnGap: "$4",
  gridRowGap: "$4",
  listStyleType: "none",
  paddingBottom: "$5",

  "@bp2": {
    gridTemplateColumns: "repeat(2, 1fr)",
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

  "@bp2": {
    padding: "$2 $3",
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
        <FilterMenuButton
          display={{
            "@initial": "none",
            "@bp2": "flex",
          }}
        />
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

export const TagDrawer = memo(function TagDrawer({
  tags,
  onClick,
}: {
  tags: Tag[];
  onClick: any;
}) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClick = useCallback(
    (e) => {
      onClick?.(e);
      setOpen(false);
    },
    [onClick]
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <FilterMenuButton
          display={{
            "@initial": "flex",
            "@bp2": "none",
          }}
          onClick={handleOpen}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <StyledDialogContent id="filterDrawer" className={theme}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Article filters</Dialog.Title>
          </VisuallyHidden.Root>

          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              This menu contains filters for each of the blog articles. Select a
              tag to filter the feed by that category, or to remove the filter
              if it&apos;s already active.
            </Dialog.Description>
          </VisuallyHidden.Root>

          <Box
            direction="vertical"
            spacingTop={7}
            spacingHorizontal={6}
            css={{ overflow: "hidden" }}
            gap={8}
          >
            <Box justifyContent="space-between" alignItems="center">
              <TextTitle3>Filter by category</TextTitle3>
              <Dialog.Close asChild>
                <CloseButton />
              </Dialog.Close>
            </Box>

            <DrawerScrollRoot>
              <DrawerScrollViewport>
                <Scrollbar orientation="vertical" variant="tertiary" />

                <StyledTagGrid>
                  {tags.map((tag) => (
                    <Box key={tag.id} as="li" direction="vertical" spacing={1}>
                      <Button variant="tertiary" onClick={handleClick}>
                        <StyledTag
                          id={tag.name}
                          borderColor={tag.color}
                          spacing={4}
                          flexGrow
                        >
                          <TextAux textTransform="uppercase">
                            {tag.name}
                          </TextAux>
                        </StyledTag>
                      </Button>
                    </Box>
                  ))}
                </StyledTagGrid>
              </DrawerScrollViewport>
            </DrawerScrollRoot>
          </Box>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
