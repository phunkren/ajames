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
  appearance: "none",
  background: "none",
  border: "none",
  color: "inherit",
  font: "inherit",
  overflow: "visible",
  padding: "0",
  lineHeight: "normal",
  transition: "background 100ms ease-out, boxShadow 100ms ease-out",

  "-webkit-appearance": "none",
  "-moz-appearance": "none",

  "&:hover": {
    color: "$blue10",
  },

  "&:active": {
    color: "$blue9",
  },

  "&[aria-disabled='true']": {
    pointerEvents: "none",
    opacity: 0.4,
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
  borderRadius: "50%",
  spacing: "$2",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  backgroundColor: "transparent",
  minWidth: 44,
  minHeight: 44,
  boxShadow: "$1",

  "&:hover": {
    boxShadow: "$4",
    borderColor: "$foreground",
    backgroundColor: "$foreground",
    color: "$background",
  },

  "&:active": {
    boxShadow: "$5",
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

export const ScrollToTopButton = memo(function ScrollToTopButton(props: any) {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <StyledScrollToTop onClick={handleScrollToTop} {...props}>
      <DoubleArrowUpIcon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
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
          <StyledIconButton title="Share" onClick={handleClick}>
            <Share2Icon width={ICON_SIZE.m} height={ICON_SIZE.m} aria-hidden />
            <VisuallyHidden.Root>Share</VisuallyHidden.Root>
          </StyledIconButton>
        ) : (
          <Button title="Share" onClick={handleClick}>
            <Box alignItems="center" gap={2}>
              <Share2Icon
                width={ICON_SIZE.m}
                height={ICON_SIZE.m}
                aria-hidden
              />
              <TextHeadline>Share</TextHeadline>
            </Box>
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
