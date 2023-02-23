import { memo, useCallback } from "react";
import * as Switch from "@radix-ui/react-switch";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { Theme } from "../types/theme";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";

const StyledSunIcon = styled(SunIcon, {
  position: "absolute",
  top: 7,
  left: 9,
  color: "$background",
});

const StyledMoonIcon = styled(MoonIcon, {
  position: "absolute",
  top: 7,
  right: 9,
  color: "white",
});

const StyledGridIcon = styled(GridIcon, {
  position: "absolute",
  top: 7,
  left: 9,
  color: "white",
});

const StyledRowsIcon = styled(RowsIcon, {
  position: "absolute",
  top: 7,
  right: 9,
  color: "white",
});

const SwitchThumb = styled(Switch.Thumb, {
  display: "block",
  width: 34,
  height: 34,
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  willChange: "transform, borderRadius",
  background: "$backgroundGradient",
  transform: "translate3d(0, 0, 0)",
  transition: "transform 100ms ease-out, borderRadius 200ms ease-out",
  zIndex: 1,

  '&[data-state="checked"]': {
    transform: "translate3d(36px, 0, 0)",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});

const SwitchRoot = styled(Switch.Root, {
  display: "inline-flex",
  position: "relative",
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  background: `radial-gradient(circle at bottom, $hover, $focus)`,
  boxShadow: "$1",
  width: 72,
  height: 36,

  "&::before": {
    content: "",
    position: "absolute",
    borderRadius: 4,
    inset: 0,
    willChange: "background",
    backgroundColor: "black",
    opacity: 0.5,
    transition: "opacity 200ms ease-out",

    [`.${lightTheme} &`]: {
      opacity: 0.3,
      color: "$background",
    },

    [`.${darkTheme} &`]: {
      opacity: 0.5,
    },
  },

  "&:hover:not(:focus)": {
    outline: "2px solid $hover",
  },
});

export const ThemeToggle = memo(function ThemeToggle() {
  const { themeName: theme, onThemeChange } = useTheme();

  const handleThemeChange = useCallback(
    (checked: boolean) => {
      onThemeChange(checked ? Theme.LIGHT : Theme.DARK);
    },
    [onThemeChange]
  );

  return (
    <SwitchRoot
      defaultChecked={theme === Theme.LIGHT}
      aria-label="Theme toggle"
      value={theme}
      onCheckedChange={handleThemeChange}
    >
      <SwitchThumb />

      <StyledSunIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />

      <StyledMoonIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </SwitchRoot>
  );
});

export const LayoutToggle = memo(function LayoutToggle(
  props: Switch.SwitchProps
) {
  return (
    <SwitchRoot {...props}>
      <SwitchThumb />

      <StyledGridIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />

      <StyledRowsIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </SwitchRoot>
  );
});
