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
  top: 4,
  left: 6,

  variants: {
    compact: {
      false: {
        "@bp2": {
          top: 7,
          left: 9,
        },
      },
    },
  },

  defaultVariants: {
    compact: false,
  },
};

const RIGHT_ICON_PROPS = {
  position: "absolute",
  color: slateDark.slate12,
  top: 4,
  right: 6,

  variants: {
    compact: {
      false: {
        "@bp2": {
          top: 7,
          right: 9,
        },
      },
    },
  },

  defaultVariants: {
    compact: false,
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
  background: "$backgroundMuted",
  transform: "translate3d(0, 0, 0)",
  transition:
    "transform $transitions$durationDefault $transitions$functionDefault",
  ["-webkit-transition"]:
    "transform $transitions$durationDefault $transitions$functionDefault",
  willChange: "transform",
  zIndex: "$1",
  width: 26,
  height: 26,

  '&[data-state="checked"]': {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    transform: "translate3d(30px, 0, 0)",
  },

  variants: {
    compact: {
      false: {
        "@bp2": {
          width: 32,
          height: 32,

          '&[data-state="checked"]': {
            transform: "translate3d(36px, 0, 0)",
          },
        },
      },
    },
  },

  defaultVariants: {
    compact: false,
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
  width: 60,
  height: 30,

  "&::before": {
    content: "",
    position: "absolute",
    borderRadius: "$1",
    inset: 0,
    backgroundColor: slateDark.slate1,
    transition: "opacity 200ms ease-out",
    ["-webkit-transition"]: "opacity 200ms ease-out",

    [`.${lightTheme} &`]: {
      opacity: 0.2,
    },

    [`.${darkTheme} &`]: {
      opacity: 0.5,
    },
  },

  variants: {
    compact: {
      false: {
        "@bp2": {
          width: 72,
          height: 36,
        },
      },
    },
  },

  "@media(hover)": {
    "&:hover:not(:focus)": {
      outline: "2px solid $hover",
    },
  },

  defaultVariants: {
    compact: false,
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
          width={ICON_SIZE.m}
          height={ICON_SIZE.m}
          compact={compact}
        />

        <StyledMoonIcon
          width={ICON_SIZE.m}
          height={ICON_SIZE.m}
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
          width={ICON_SIZE.m}
          height={ICON_SIZE.m}
          compact={compact}
        />

        <StyledRowsIcon
          width={ICON_SIZE.m}
          height={ICON_SIZE.m}
          compact={compact}
        />
      </SwitchRoot>
    </Tooltip>
  );
});
