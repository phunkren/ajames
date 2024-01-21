import { memo, useCallback } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { GridIcon, MoonIcon, RowsIcon, SunIcon } from "@radix-ui/react-icons";
import { slateDarkA } from "@radix-ui/colors";
import { styled } from "../stitches.config";
import { ICON_SIZE } from "../util/images";
import { useTheme } from "../hooks/useTheme";
import { Tooltip } from "./Tooltip";
import { Theme } from "./Theme";
import { IconButton } from "./Button";

type Props = Toggle.ToggleProps & {
  compact?: boolean;
  opaque?: boolean;
};

const ICON_PROPS = {
  display: "flex",
  color: "$foreground",

  "@media(hover)": {
    "&:hover": {
      color: "$background",
    },
  },
};

const HEADER_ICON_PROPS = {
  display: "flex",

  variants: {
    opaque: {
      true: {
        color: "$foreground",
      },
      false: {
        color: `${slateDarkA.slateA12}`,
      },
    },
  },

  defaultVariants: {
    opaque: false,
  },
};

const StyledSunIcon = styled(SunIcon, {
  ...HEADER_ICON_PROPS,
});

const StyledMoonIcon = styled(MoonIcon, {
  ...HEADER_ICON_PROPS,
});

const StyledGridIcon = styled(GridIcon, {
  ...ICON_PROPS,
});

const StyledRowsIcon = styled(RowsIcon, {
  ...ICON_PROPS,
});

const ToggleRoot = styled(Toggle.Root, {
  width: 44,
  height: 44,
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  appearance: "none",
  borderRadius: "50%",
  border: "none",
});

export const ThemeToggle = memo(function ThemeToggle({ opaque }: Props) {
  const { themeName: theme, onThemeChange } = useTheme();

  const handleThemeChange = useCallback(
    (checked: boolean) => {
      onThemeChange(checked ? Theme.LIGHT : Theme.DARK);
    },
    [onThemeChange]
  );

  return (
    <Tooltip title="Theme">
      <ToggleRoot
        aria-label="Theme"
        pressed={theme === Theme.LIGHT}
        onPressedChange={handleThemeChange}
      >
        {theme === Theme.LIGHT ? (
          <StyledSunIcon
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            opaque={opaque}
          />
        ) : null}

        {theme === Theme.DARK ? (
          <StyledMoonIcon
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            opaque={opaque}
          />
        ) : null}
      </ToggleRoot>
    </Tooltip>
  );
});

export const LayoutToggle = memo(function LayoutToggle({
  compact = false,
  value,
  ...props
}: Props) {
  return (
    <Tooltip title="Layout">
      <IconButton
        as={ToggleRoot}
        aria-label="Theme"
        css={{
          "@media(hover)": {
            "&:hover > *": {
              color: "$background",
            },
          },
        }}
        {...props}
      >
        {value === "grid" ? (
          <StyledGridIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
        ) : null}

        {value === "rows" ? (
          <StyledRowsIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
        ) : null}
      </IconButton>
    </Tooltip>
  );
});
