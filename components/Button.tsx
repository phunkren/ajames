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
import { Box } from "./Box";
import {
  FilterClearProps,
  FilterMenuProps,
  ShareButtonProps,
} from "../types/button";

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
  border: "none",
  color: "inherit",
  font: "inherit",
  overflow: "visible",
  padding: "0",
  transition: "background 100ms ease-out, boxShadow 100ms ease-out",

  appearance: "none",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",

  "&[aria-disabled='true']": {
    pointerEvents: "none",
    opacity: 0.4,
  },

  variants: {
    variant: {
      primary: {
        boxShadow: "$1",
        backgroundColor: "$foreground",
        color: "$background",

        "&:hover": {
          boxShadow: "$4",
          borderColor: "$foreground",
          backgroundColor: "$foregroundMuted",

          svg: {
            color: "$background",
          },
        },

        "&:active": {
          boxShadow: "$5",
        },
      },
      secondary: {
        borderColor: "$foregroundMuted",
        boxShadow: "$1",

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
      tertiary: {
        backgroundColor: "transparent",

        "&:hover": {
          boxShadow: "none",
          color: "unset",
          backgroundImage: `linear-gradient(90deg, $blue11 0.04%, $blue9 100.04%)`,
          backgroundClip: "text",
          ["-webkit-text-fill-color"]: "transparent",
        },

        "&:hover svg": {
          color: "$blue9",
        },
      },
    },
  },

  defaultVariants: {
    variant: "secondary",
  },
});

export const Button = memo(
  forwardRef((props: any, ref: Ref<HTMLButtonElement>) => {
    return <StyledButton ref={ref} type="button" {...props} />;
  })
);

export const StyledIconButton = styled(Button, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 44,
  minHeight: 44,
  borderRadius: "50%",
  borderWidth: 1,
  borderStyle: "solid",
  backgroundColor: "transparent",

  variants: {
    variant: {
      primary: {
        boxShadow: "$1",
        borderColor: "$foregroundMuted",

        "&:hover, &:active": {
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

        "&:hover, &:active": {
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
    variant: "primary",
  },
});

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

  "&:hover": {
    boxShadow: "$4",
  },

  "&:active": {
    boxShadow: "$5",
  },
});

const StyledScrollToTop = styled(StyledIconButton, {
  gap: "$2",
  borderRadius: 4,
  width: "fit-content",
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

const StyledMobileNavigationButton = styled(StyledIconButton, {
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

export const ScrollToTopButton = memo(function ScrollToTopButton(props: any) {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <StyledScrollToTop onClick={handleScrollToTop} {...props}>
      <DoubleArrowUpIcon width={ICON_SIZE.s} height={ICON_SIZE.s} aria-hidden />
      <TextAux>Scroll to Top</TextAux>
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
          <StyledIconButton title="Share" onClick={handleClick}>
            <Share2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
            <VisuallyHidden.Root>Share</VisuallyHidden.Root>
          </StyledIconButton>
        ) : (
          <Button variant="tertiary" onClick={handleClick}>
            <Share2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
            <TextHeadline css={{ spacingLeft: "$2" }}>Share</TextHeadline>
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
  );
});

export const PrintButton = memo(function PrintButton(props: any) {
  const handleClick = useCallback(() => {
    window.print();
  }, []);

  return (
    <StyledIconButton title="Print" onClick={handleClick} {...props}>
      <VisuallyHidden.Root>Print</VisuallyHidden.Root>
      <FileIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
    </StyledIconButton>
  );
});

export const FilterClearButton = memo(function FilterClearButton({
  filters,
  ...props
}: FilterClearProps) {
  const { pathname, push } = useRouter();

  const handleClick = useCallback(() => {
    push({ pathname }, undefined, {
      scroll: false,
    });
  }, [pathname, push]);

  return (
    <StyledIconButton
      title="Clear Filters"
      aria-disabled={!filters.length}
      onClick={handleClick}
      {...props}
    >
      <VisuallyHidden.Root>
        <TextAux>Clear filters</TextAux>
      </VisuallyHidden.Root>

      <Cross2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} />
    </StyledIconButton>
  );
});

export const FilterMenuButton = memo(
  forwardRef(function FilterMenuButton(
    { open, ...props }: FilterMenuProps,
    ref: Ref<HTMLButtonElement>
  ) {
    return (
      <StyledIconButton
        ref={ref}
        title={open ? "Collapse Filters" : "Expand Filters"}
        {...props}
      >
        {open ? (
          <>
            <VisuallyHidden.Root>
              <TextAux>Close menu</TextAux>
            </VisuallyHidden.Root>

            <ChevronUpIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </>
        ) : (
          <>
            <VisuallyHidden.Root>
              <TextAux>Open menu</TextAux>
            </VisuallyHidden.Root>

            <DropdownMenuIcon width={ICON_SIZE.m} height={ICON_SIZE.m} />
          </>
        )}
      </StyledIconButton>
    );
  })
);

export const MobileNavigationButton = memo(function MobileNavigationButton(
  props: any
) {
  return (
    <StyledMobileNavigationButton
      title="Mobile Navigation Menu"
      variant="secondary"
      {...props}
    >
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
  );
});
