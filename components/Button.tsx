import {
  forwardRef,
  memo,
  MouseEvent,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import * as Toggle from "@radix-ui/react-toggle";
import * as Toast from "@radix-ui/react-toast";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ToggleProps } from "@radix-ui/react-toggle-group";
import {
  ChevronUpIcon,
  Cross1Icon,
  Cross2Icon,
  DoubleArrowUpIcon,
  DropdownMenuIcon,
  FileIcon,
  HamburgerMenuIcon,
  InfoCircledIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { CSS, keyframes, styled } from "../stitches.config";
import { PERSONAL } from "../util/data";
import { ICON_SIZE } from "../util/images";
import { TextAux, TextHeadline } from "./Text";
import { Tooltip } from "./Tooltip";
import { Box } from "./Box";
import { DISPLAY_VARIANTS } from "../styles/display";

type ButtonProps = any; // ComponentProps<typeof StyledButton>;

type IconButtonProps = any; // ComponentProps<typeof StyledIconButton>;

type ShareButtonProps = ButtonProps & {
  url: string;
  text: string;
  emoji?: string;
  variant?: string;
};

type FilterClearProps = ButtonProps & {
  filter?: string;
};

type FilterMenuProps = ButtonProps & {
  open: boolean;
};

const scaleIn = keyframes({
  from: { transform: "rotateX(-30deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-10deg) scale(0.95)", opacity: 0 },
});

const StyledButton = styled("button", {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  borderWidth: 2,
  borderColor: "transparent",
  borderStyle: "solid",
  color: "inherit",
  font: "inherit",
  overflow: "visible",
  padding: 0,
  transition: "background 100ms ease-out, boxShadow 100ms ease-out",
  borderRadius: "$1",
  willChange: "background, boxShadow",

  appearance: "none",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",

  "&[aria-disabled='true']": {
    pointerEvents: "none",
    opacity: 0.4,
  },

  variants: {
    ...DISPLAY_VARIANTS,
    variant: {
      primary: {
        boxShadow: "$1",
        backgroundColor: "$foregroundMuted",
        color: "$background",
        padding: "$2",

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",
            borderColor: "$foregroundMuted",
            backgroundColor: "$foregroundMuted",

            svg: {
              color: "$background",
            },
          },
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
      secondary: {
        borderColor: "$foreground",
        boxShadow: "$1",
        padding: "$2",

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",
            borderColor: "$foreground",
            backgroundColor: "$foreground",
            color: "$background",

            svg: {
              color: "$background",
            },
          },
        },
      },
      tertiary: {
        backgroundColor: "transparent",
      },
    },
  },

  defaultVariants: {
    display: "flex",
    variant: "secondary",
  },
});

export const StyledIconButton = styled("button", {
  alignItems: "center",
  justifyContent: "center",
  minWidth: 44,
  minHeight: 44,
  borderRadius: "50%",
  borderWidth: 2,
  borderStyle: "solid",
  backgroundColor: "transparent",
  transition: "background 100ms ease-out, boxShadow 100ms ease-out",
  color: "$foreground",
  willChange: "background, boxShadow",

  appearance: "none",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",

  "&[aria-disabled='true']": {
    pointerEvents: "none",
    opacity: 0.4,
  },

  variants: {
    ...DISPLAY_VARIANTS,
    variant: {
      primary: {
        boxShadow: "$1",
        borderColor: "$foregroundMuted",

        "@media(hover)": {
          "&:hover": {
            boxShadow: "$4",
            borderColor: "$foreground",
            backgroundColor: "$foreground",
            color: "$background",

            svg: {
              color: "$background",
            },
          },
        },

        "&:active": {
          boxShadow: "$4",
          borderColor: "$foreground",
          backgroundColor: "$foreground",
          color: "$background",

          svg: {
            color: "$background",
          },
        },
      },
      secondary: {
        borderColor: "transparent",
        boxShadow: "none",

        "@media(hover)": {
          "&:hover": {
            boxShadow: "none",
            borderColor: "transparent",
            backgroundColor: "transparent",
            color: "currentcolor",

            svg: {
              color: "currentcolor",
            },
          },
        },

        "&:active": {
          boxShadow: "none",
          borderColor: "transparent",
          backgroundColor: "transparent",
          color: "currentcolor",

          svg: {
            color: "currentcolor",
          },
        },
      },
    },
  },

  defaultVariants: {
    display: "flex",
    variant: "primary",
  },
});

export const Button = memo(
  forwardRef((props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return <StyledButton ref={ref} type="button" {...props} />;
  })
);

export const IconButton = memo(
  forwardRef((props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
    return <StyledIconButton ref={ref} type="button" {...props} />;
  })
);

const StyledToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  bottom: "$7",
  right: "50%",
  display: "flex",
  flexDirection: "column",
  padding: "$2",
  gap: 10,
  width: "fit-content",
  maxWidth: "100vw",
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
  transform: "translateX(50%)",
});

const StyledToastRoot = styled(Toast.Root, {
  backgroundColor: "$foreground",
  color: "$background",
  borderRadius: 6,
  padding: "$4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "$2",

  '&[data-state="open"]': { animation: `${scaleIn} 200ms ease-out` },
  '&[data-state="closed"]': { animation: `${scaleOut} 200ms ease-out` },

  "@media(hover)": {
    "&:hover": {
      boxShadow: "$4",
    },
  },

  "&:active": {
    boxShadow: "$5",
  },
});

const StyledScrollToTop = styled(StyledButton, {
  gap: "$2",
  padding: "$2 $4",
});

const StyledPreviewToggle = styled(Toggle.Root, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "transparent",
});

const StyledMobileNavigationButton = styled(IconButton, {
  borderWidth: 0,

  "&[data-state=open]": {
    "svg#mobileNav-hamburger": {
      display: "none",
    },

    "svg#mobileNav-cross": {
      display: "flex",
    },
  },

  "&[data-state=closed]": {
    "svg#mobileNav-hamburger": {
      display: "flex",
    },

    "svg#mobileNav-cross": {
      display: "none",
    },
  },
});

export const ScrollToTopButton = memo(function ScrollToTopButton(
  props: ButtonProps
) {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <StyledScrollToTop
      variant="tertiary"
      onClick={handleScrollToTop}
      {...props}
    >
      <DoubleArrowUpIcon width={ICON_SIZE.s} height={ICON_SIZE.s} aria-hidden />
      <TextHeadline>Scroll to Top</TextHeadline>
    </StyledScrollToTop>
  );
});

export const ShareButton = memo(function ShareButton({
  url,
  text,
  emoji = "👀",
  variant = "default",
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  const timerRef = useRef(0);

  const handleClick = useCallback(() => {
    setOpen(false);

    window.clearTimeout(timerRef.current);

    const formattedText = `${emoji} ${text}`;
    const formattedAuthor = `🙋‍♂️ ${PERSONAL.name}`;
    const formattedUrl = `🔗 ${url}`;

    const copy = `${formattedText}\n${formattedAuthor}\n\n${formattedUrl}`;

    if (navigator.share) {
      navigator.share({
        title: formattedText,
        text: formattedAuthor,
        url: formattedUrl,
      });
    } else {
      navigator.clipboard.writeText(copy).then(() => {
        timerRef.current = window.setTimeout(() => {
          setOpen(true);
        }, 100);
      });
    }
  }, [emoji, text, url]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <Toast.Provider label="Share notification" duration={5000}>
      <Box>
        {variant === "icon" ? (
          <Tooltip title="Share">
            <IconButton onClick={handleClick}>
              <Share2Icon
                width={ICON_SIZE.m}
                height={ICON_SIZE.m}
                aria-hidden
              />
              <VisuallyHidden.Root>Share</VisuallyHidden.Root>
            </IconButton>
          </Tooltip>
        ) : (
          <Button variant="tertiary" onClick={handleClick}>
            <Share2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
            <TextHeadline spacingLeft={2}>Share</TextHeadline>
          </Button>
        )}

        <StyledToastRoot open={open} onOpenChange={setOpen}>
          <Toast.Description>Copied to clipboard!</Toast.Description>
        </StyledToastRoot>

        <StyledToastViewport />
      </Box>
    </Toast.Provider>
  );
});

export const PreviewToggle = memo(function PreviewToggle({
  pressed,
  ...props
}: ToggleProps & CSS) {
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  }, []);

  return (
    <Tooltip title={pressed ? "Hide Description" : "Show Description"}>
      <StyledPreviewToggle
        aria-label="Preview toggle"
        pressed={pressed}
        onClick={handleClick}
        {...props}
      >
        {pressed ? (
          <>
            <VisuallyHidden.Root>Hide Description</VisuallyHidden.Root>
            <Cross1Icon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </>
        ) : (
          <>
            <VisuallyHidden.Root>Show Description</VisuallyHidden.Root>
            <InfoCircledIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </>
        )}
      </StyledPreviewToggle>
    </Tooltip>
  );
});

export const PrintButton = memo(function PrintButton(props: IconButtonProps) {
  const handleClick = useCallback(() => {
    window.print();
  }, []);

  return (
    <Tooltip title="Print CV">
      <IconButton onClick={handleClick} {...props}>
        <VisuallyHidden.Root>Print CV</VisuallyHidden.Root>
        <FileIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
      </IconButton>
    </Tooltip>
  );
});

export const FilterClearButton = memo(function FilterClearButton({
  filter,
  ...props
}: FilterClearProps) {
  const { pathname, push } = useRouter();

  const handleClick = useCallback(() => {
    push({ pathname, hash: "writing", query: {} }, undefined, {
      scroll: false,
      shallow: true,
    });
  }, [pathname, push]);

  return (
    <Tooltip title="Clear Filter">
      <IconButton aria-disabled={!filter} onClick={handleClick} {...props}>
        <VisuallyHidden.Root>Clear filter</VisuallyHidden.Root>

        <Cross2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} />
      </IconButton>
    </Tooltip>
  );
});

export const FilterMenuButton = memo(
  forwardRef(function FilterMenuButton(
    { open, ...props }: FilterMenuProps,
    ref: Ref<HTMLButtonElement>
  ) {
    return (
      <Tooltip title={open ? "Collapse Filters" : "Filter Articles"}>
        <IconButton ref={ref} {...props}>
          {open ? (
            <>
              <VisuallyHidden.Root>Close menu</VisuallyHidden.Root>

              <ChevronUpIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
            </>
          ) : (
            <>
              <VisuallyHidden.Root>Open menu</VisuallyHidden.Root>

              <DropdownMenuIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
            </>
          )}
        </IconButton>
      </Tooltip>
    );
  })
);

export const MobileNavigationButton = memo(
  forwardRef((props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <Tooltip title="Navigation">
        <StyledMobileNavigationButton ref={ref} variant="secondary" {...props}>
          <VisuallyHidden.Root>Navigation</VisuallyHidden.Root>

          <HamburgerMenuIcon
            id="mobileNav-hamburger"
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            aria-hidden
          />

          <Cross1Icon
            id="mobileNav-cross"
            width={ICON_SIZE.l}
            height={ICON_SIZE.l}
            aria-hidden
          />
        </StyledMobileNavigationButton>
      </Tooltip>
    );
  })
);

export const CloseButton = memo(function CloseButton(props: IconButtonProps) {
  return (
    <Tooltip title="Close">
      <IconButton variant="secondary" {...props}>
        <Cross1Icon width={ICON_SIZE.l} height={ICON_SIZE.l} aria-hidden />
      </IconButton>
    </Tooltip>
  );
});
