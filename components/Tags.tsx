import { memo, MouseEvent, useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import * as Select from "@radix-ui/react-select";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { useTheme } from "../hooks/useTheme";
import { NOTION_TAG_VARIANTS } from "../styles/tag";
import { TextAux, TextTitle3 } from "./Text";
import { Button, CloseButton, FilterMenuButton } from "./Button";
import { Box } from "./Box";
import { DrawerScrollRoot, DrawerScrollViewport, Scrollbar } from "./Scroll";
import { Tag } from "../util/notion";

type TagSelectProps = Pick<Select.SelectViewportProps, "children"> &
  Pick<Select.SelectProps, "value" | "onValueChange">;

type TagDrawerProps = { tags: Tag[]; onClick: (tagName: string) => void };

const dialogSlideUp = keyframes({
  "0%": { transform: "translate3d(0, 0, 0)" },
  "100%": { transform: "translate3d(0, -325px, 0)" },
});

const StyledSelectContent = styled(Select.Content, {
  background: "$backgroundMuted",
  borderRadius: "$1",
  padding: "$2",
  boxShadow: "$2",
  zIndex: 10,

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
    },
  },
});

const StyledSelectItem = styled(Select.Item, {
  spacingHorizontal: "$4",
  spacingVertical: "$1",
  cursor: "pointer",

  "@media(hover)": {
    "&:hover": {
      outline: "none",
      color: "$hover",

      [`.${lightTheme} &`]: {
        background: "rgba(0,0,0,0.05)",
      },

      [`.${darkTheme} &`]: {
        background: "rgba(255,255,255,0.05)",
      },
    },
  },

  "&:focus": {
    outline: "none",
    color: "$hover",

    [`.${lightTheme} &`]: {
      background: "rgba(0,0,0,0.05)",
    },

    [`.${darkTheme} &`]: {
      background: "rgba(255,255,255,0.05)",
    },
  },

  "&[data-state='checked']": {
    color: "$focus",
  },
});

const StyledSelectArrow = styled(Select.Arrow, {
  fill: "$backgroundMuted",
});

const StyledDrawerContent = styled(Dialog.Content, {
  position: "fixed",
  bottom: -325,
  left: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "$backgroundMuted",
  boxShadow: "$3",
  height: 325,
  width: "100dvw",
  borderRadius: 8,
  minWidth: 300,
  zIndex: 99,
  transform: "translate3d(0, 0, 0)",
  animation: `${dialogSlideUp} 300ms ease-out 50ms forwards`,
});

const StyledDrawerGrid = styled("ul", {
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
  borderRadius: "$1",
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
    borderRadius: "$1",
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

export const TagSelect = memo(function TagSelect({
  value,
  children,
  onValueChange,
}: TagSelectProps) {
  const { theme } = useTheme();

  return (
    <Select.Root name="Filter" value={value} onValueChange={onValueChange}>
      <Select.Trigger aria-label="Article Filter" asChild>
        <FilterMenuButton display={{ "@initial": "none", "@bp2": "flex" }} />
      </Select.Trigger>

      <StyledSelectContent
        position="popper"
        align="end"
        arrowPadding={4}
        sideOffset={8}
        sticky="always"
        className={theme}
        hideWhenDetached
      >
        <Select.Viewport>{children}</Select.Viewport>
        <StyledSelectArrow />
      </StyledSelectContent>
    </Select.Root>
  );
});

export const TagSelectItem = memo(function TagSelectItem({
  id,
  value,
  ...props
}: Select.SelectItemProps) {
  return (
    <StyledSelectItem id={id} value={value} {...props}>
      <TextAux textTransform="uppercase">{value}</TextAux>
    </StyledSelectItem>
  );
});

export const TagDrawer = memo(function TagDrawer({
  tags,
  onClick,
}: TagDrawerProps) {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const tagTarget = e.target as HTMLElement;
      const tagName = tagTarget.id;

      onClick?.(tagName);
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
        <StyledDrawerContent id="filterDrawer" className={theme}>
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Article filters</Dialog.Title>
          </VisuallyHidden.Root>

          <VisuallyHidden.Root asChild>
            <Dialog.Description>
              This menu contains filters for each of the blog articles. Select a
              tag to filter the feed by that category.
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
              <DrawerScrollViewport className={theme}>
                <StyledDrawerGrid>
                  {tags.map((tag) => (
                    <Box
                      key={tag.id}
                      as="li"
                      direction="vertical"
                      spacing={1}
                      css={{ scrollSnapAlign: "center" }}
                    >
                      <Button variant="tertiary" onClick={handleClick}>
                        <StyledTag
                          id={tag.name}
                          borderColor={tag.color}
                          spacing={4}
                          flexGrow
                        >
                          <TextAux color="primary" textTransform="uppercase">
                            {tag.name}
                          </TextAux>
                        </StyledTag>
                      </Button>
                    </Box>
                  ))}
                </StyledDrawerGrid>

                <Scrollbar orientation="vertical" variant="tertiary" />
              </DrawerScrollViewport>
            </DrawerScrollRoot>
          </Box>
        </StyledDrawerContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
