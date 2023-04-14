import { memo, useCallback } from "react";
import * as Switch from "@radix-ui/react-switch";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { darkTheme, lightTheme, styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Tooltip } from "./Tooltip";
import { Theme } from "./Theme";
import { slateDark } from "@radix-ui/colors";

type Props = Switch.SwitchProps & {
  compact?: boolean;
};

const LEFT_ICON_PROPS = {
  position: "absolute",
  color: slateDark.slate12,

  variants: {
    compact: {
      true: {
        top: 6,
        left: 8,
      },
      false: {
        top: 7,
        left: 9,
      },
    },
  },
};

const RIGHT_ICON_PROPS = {
  position: "absolute",
  color: slateDark.slate12,

  variants: {
    compact: {
      true: {
        top: 6,
        right: 8,
      },
      false: {
        top: 7,
        right: 9,
      },
    },
  },
};

const StyledSunIcon = styled(SunIcon, {
  ...LEFT_ICON_PROPS,
});

const StyledMoonIcon = styled(MoonIcon, {
  ...RIGHT_ICON_PROPS,
});

const StyledGridIcon = styled(GridIcon, {
  ...LEFT_ICON_PROPS,
});

const StyledRowsIcon = styled(RowsIcon, {
  ...RIGHT_ICON_PROPS,
});

const SwitchThumb = styled(Switch.Thumb, {
  display: "block",
  borderTopLeftRadius: 2,
  borderBottomLeftRadius: 2,
  background: "$background",
  transform: "translate3d(0, 0, 0)",
  transition: "transform 100ms ease-out",
  willChange: "transform",
  zIndex: 1,

  '&[data-state="checked"]': {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },

  variants: {
    compact: {
      true: {
        width: 26,
        height: 26,

        '&[data-state="checked"]': {
          transform: "translate3d(30px, 0, 0)",
        },
      },
      false: {
        width: 32,
        height: 32,

        '&[data-state="checked"]': {
          transform: "translate3d(36px, 0, 0)",
        },
      },
    },
  },
});

const SwitchRoot = styled(Switch.Root, {
  display: "inline-flex",
  position: "relative",
  borderRadius: "$1",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "$slate12",
  background: `radial-gradient(circle at bottom, $hover, $focus)`,
  boxShadow: "$1",

  "&::before": {
    content: "",
    position: "absolute",
    borderRadius: "$1",
    inset: 0,
    backgroundColor: slateDark.slate1,
    transition: "opacity 200ms ease-out",
    willChange: "opacity",

    [`.${lightTheme} &`]: {
      opacity: 0.2,
    },

    [`.${darkTheme} &`]: {
      opacity: 0.5,
    },
  },

  variants: {
    compact: {
      true: {
        width: 60,
        height: 30,
      },
      false: {
        width: 72,
        height: 36,
      },
    },
  },

  "@media(hover)": {
    "&:hover:not(:focus)": {
      outline: "2px solid $hover",
    },
  },
});

export const ThemeToggle = memo(function ThemeToggle({
  compact = false,
}: Props) {
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
        compact={compact}
        onCheckedChange={handleThemeChange}
      >
        <SwitchThumb compact={compact} />

        <StyledSunIcon
          width={compact ? ICON_SIZE.s : ICON_SIZE.m}
          height={compact ? ICON_SIZE.s : ICON_SIZE.m}
          compact={compact}
        />

        <StyledMoonIcon
          width={compact ? ICON_SIZE.s : ICON_SIZE.m}
          height={compact ? ICON_SIZE.s : ICON_SIZE.m}
          compact={compact}
        />
      </SwitchRoot>
    </Tooltip>
  );
});

export const LayoutToggle = memo(function LayoutToggle({
  compact = false,
  ...props
}: Props) {
  return (
    <Tooltip title="Layout">
      <SwitchRoot compact={compact} {...props}>
        <SwitchThumb compact={compact} />

        <StyledGridIcon
          width={compact ? ICON_SIZE.s : ICON_SIZE.m}
          height={compact ? ICON_SIZE.s : ICON_SIZE.m}
          compact={compact}
        />

        <StyledRowsIcon
          width={compact ? ICON_SIZE.s : ICON_SIZE.m}
          height={compact ? ICON_SIZE.s : ICON_SIZE.m}
          compact={compact}
        />
      </SwitchRoot>
    </Tooltip>
  );
});
