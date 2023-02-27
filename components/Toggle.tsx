import { memo, useCallback } from "react";
import * as Switch from "@radix-ui/react-switch";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Tooltip } from "./Tooltip";
import { Theme } from "./Theme";

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
  borderTopLeftRadius: "$1",
  borderBottomLeftRadius: "$1",
  background: "$backgroundGradient",
  transform: "translate3d(0, 0, 0)",
  transition: "transform 100ms ease-out, borderRadius 200ms ease-out",
  willChange: "transform, borderRadius",
  zIndex: 1,

  '&[data-state="checked"]': {
    transform: "translate3d(36px, 0, 0)",
    borderTopRightRadius: "$1",
    borderBottomRightRadius: "$1",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});

const SwitchRoot = styled(Switch.Root, {
  display: "inline-flex",
  position: "relative",
  borderRadius: "$1",
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
    borderRadius: "$1",
    inset: 0,
    backgroundColor: "black",
    opacity: 0.5,
    transition: "opacity 200ms ease-out",
    willChange: "opacity",

    [`.${lightTheme} &`]: {
      opacity: 0.3,
      color: "$background",
    },

    [`.${darkTheme} &`]: {
      opacity: 0.5,
    },
  },

  "@media(hover)": {
    "&:hover:not(:focus)": {
      outline: "2px solid $hover",
    },
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
    <Tooltip title="Theme">
      <SwitchRoot
        defaultChecked={theme === Theme.LIGHT}
        aria-label="Theme"
        value={theme}
        onCheckedChange={handleThemeChange}
      >
        <SwitchThumb />

        <StyledSunIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />

        <StyledMoonIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </SwitchRoot>
    </Tooltip>
  );
});

export const LayoutToggle = memo(function LayoutToggle(
  props: Switch.SwitchProps
) {
  return (
    <Tooltip title="Layout">
      <SwitchRoot {...props}>
        <SwitchThumb />

        <StyledGridIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />

        <StyledRowsIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </SwitchRoot>
    </Tooltip>
  );
});
