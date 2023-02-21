import { memo, useCallback } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { blackA, whiteA } from "@radix-ui/colors";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { Theme } from "../types/theme";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { TextAux } from "./Text";

const rise = keyframes({
  "0%": { transform: "translate3d(0, 75%, 0)" },
  "100%": { transform: "translate3d(0, 0, 0)" },
});

const set = keyframes({
  "0%": { transform: "translate3d(0, 0, 0)" },
  "100%": { transform: "translate3d(0, 100%, 0)" },
});

const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  backgroundColor: "$backgroundMuted",
  boxShadow: "$1",
});

const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  height: 32,
  width: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  overflow: "hidden",
  transition: "backgroundColor 100ms ease-out, opacity 100ms ease-out",

  "&:focus": {
    outline: "2px solid $focus",
    opacity: 1,
  },

  "&[data-state=off]": {
    "&:not(:focus)": {
      opacity: 0.5,
    },

    "&:hover:not(:focus)": {
      opacity: 0.75,
    },

    [`.${darkTheme} &`]: {
      backgroundColor: whiteA.whiteA7,
    },

    [`.${darkTheme} &:hover`]: {
      backgroundColor: whiteA.whiteA8,
    },

    [`.${lightTheme} &`]: {
      backgroundColor: blackA.blackA7,
    },

    [`.${lightTheme} &:hover`]: {
      backgroundColor: blackA.blackA8,
    },
  },

  "&[data-state=on]": {
    opacity: 1,
    cursor: "default",
    pointerEvents: "none",
  },

  "&:first-child": {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },

  "&:last-child": { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
});

const LightToggle = styled(ToggleGroupItem, {
  "&[data-state=off]": {
    "& > *": {
      transform: "translate3d(0, 100%, 0)",
      animation: `${set} 200ms ease-out forwards running`,
    },
  },

  "&[data-state=on]": {
    transform: "translate3d(0, 0, 0)",

    "& > *": {
      animation: `${rise} 200ms ease-out forwards`,
    },
  },
});

const DarkToggle = styled(ToggleGroupItem, {
  "&[data-state=off]": {
    "& > *": {
      transform: "translateY(100%)",
      animation: `${set} 200ms ease-out forwards running`,
    },
  },

  "&[data-state=on]": {
    transform: "translateY(0)",

    "& > *": {
      animation: `${rise} 200ms ease-out forwards`,
    },
  },
});

const PageToggleRoot = styled(ToggleGroup.Root, {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "$8",
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

export const ThemeToggle = memo(function ThemeToggle() {
  const { themeName: theme, onThemeChange } = useTheme();

  const handleThemeChange = useCallback(
    (newTheme: Theme) => {
      if (newTheme) {
        onThemeChange(newTheme);
      }
    },
    [onThemeChange]
  );

  return (
    <ToggleGroupRoot
      type="single"
      defaultValue={Theme.DARK}
      aria-label="Theme toggle"
      orientation="horizontal"
      value={theme}
      onValueChange={handleThemeChange}
    >
      <DarkToggle value={Theme.DARK} aria-label="Dark mode">
        <MoonIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </DarkToggle>

      <LightToggle value={Theme.LIGHT} aria-label="Light mode">
        <SunIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </LightToggle>
    </ToggleGroupRoot>
  );
});

export const LayoutToggle = memo(function LayoutToggle(
  props: ToggleGroup.ToggleGroupSingleProps
) {
  return (
    <ToggleGroupRoot {...props}>
      <ToggleGroupItem value="grid" aria-label="grid tiles">
        <GridIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </ToggleGroupItem>

      <ToggleGroupItem value="rows" aria-label="vertical list">
        <RowsIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </ToggleGroupItem>
    </ToggleGroupRoot>
  );
});

export const PageToggle = memo(function PageToggle(
  props: ToggleGroup.ToggleGroupSingleProps
) {
  return (
    <PageToggleRoot aria-label="Nav toggle" orientation="vertical" {...props}>
      <PageToggleItem value="short">
        <TextAux textTransform="capitalize">Short</TextAux>
      </PageToggleItem>

      <PageToggleItem value="long">
        <TextAux textTransform="capitalize">Long</TextAux>
      </PageToggleItem>
    </PageToggleRoot>
  );
});
