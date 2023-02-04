import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { memo, useCallback, useEffect } from "react";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { darkTheme, keyframes, lightTheme, styled } from "../stitches.config";
import { Theme } from "../types/theme";
import { ICON_SIZE } from "../util/images";
import { blackA, whiteA } from "@radix-ui/colors";
import { useTheme } from "../hooks/useTheme";
import { useLocalStorage } from "../hooks/useLocalStorage";

// const peek = keyframes({
//   "0%": { transform: "translateY(100%)" },
//   "100%": { transform: "translateY(75%)" },
// });

const rise = keyframes({
  "0%": { transform: "translateY(75%)" },
  "100%": { transform: "translateY(0)" },
});

const set = keyframes({
  "0%": { transform: "translateY(0)" },
  "100%": { transform: "translateY(100%)" },
});

export const ToggleGroupRoot = styled(ToggleGroup.Root, {
  display: "inline-flex",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  backgroundColor: "$backgroundMuted",
  boxShadow: "$1",
});

export const ToggleGroupItem = styled(ToggleGroup.Item, {
  all: "unset",
  height: 28,
  width: 28,
  display: "flex",
  fontSize: 15,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 1,
  backgroundColor: "transparent",
  overflow: "hidden",
  transition: "backgroundColor 100ms ease-out, opacity 100ms ease-out",

  "&:focus": {
    outline: "2px solid $foreground",
  },

  "&[data-state=off]": {
    opacity: 0.5,

    "&:hover": {
      opacity: 0.75,
    },

    [`.${darkTheme} &`]: {
      backgroundColor: whiteA.whiteA7,
    },

    [`.${darkTheme} &:hover, .${darkTheme} &:has(a:focus)`]: {
      backgroundColor: whiteA.whiteA8,
    },

    [`.${lightTheme} &`]: {
      backgroundColor: blackA.blackA7,
    },

    [`.${lightTheme} &:hover, .${lightTheme} &:has(a:focus)`]: {
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
