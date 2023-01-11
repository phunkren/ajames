import {
  ButtonHTMLAttributes,
  forwardRef,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Toggle from "@radix-ui/react-toggle";
import * as Toast from "@radix-ui/react-toast";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ToggleProps } from "@radix-ui/react-toggle-group";
import {
  DoubleArrowUpIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FileIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import { usePrevious } from "../hooks/usePrevious";
import { CSS, styled } from "../stitches.config";
import { Box } from "./Layout";
import { PERSONAL } from "../util/data";
import { blackA, whiteA } from "@radix-ui/colors";
import { TextHeadline } from "./Text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

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

  "line-height": "normal",
  "-webkit-appearance": "none",
  "-moz-appearance": "none",
});

export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return <StyledButton ref={ref} type="button" {...props} />;
  }
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
  minWidth: 44,
  minHeight: 44,

  "&:hover": {
    backgroundColor: "$foregroundMuted",
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
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
  padding: 15,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
});

const StyledScrollToTop = styled(Button, {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignitems: "center",
  justifyContent: "center",
  boxShadow: `0px 2px 4px ${blackA.blackA10}`,
  background: "$foreground",
  color: "$background",
  padding: "$4",
  gap: "$2",
  borderRadius: 4,
  border: "none",

  variants: {
    active: {
      true: {
        bottom: "$10",
      },
      false: {
        bottom: -1000,
      },
    },
  },
});

export function ScrollToTopButton() {
  const [scrollY, setScrollY] = useState<number>();
  const previousScrollY = usePrevious(scrollY);

  const isUserScrollingUp = previousScrollY > scrollY;
  const isThresholdPassed = scrollY > 1000;
  const isButtonActive = isUserScrollingUp && isThresholdPassed;

  function handleScrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPositionY = window.pageYOffset;
      setScrollY(scrollPositionY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <StyledScrollToTop
      aria-hidden
      active={isButtonActive}
      onClick={handleScrollToTop}
      tabIndex={-1}
    >
      <DoubleArrowUpIcon width={18} height={18} />
      <TextHeadline>Scroll to top</TextHeadline>
    </StyledScrollToTop>
  );
}

export function ShareButton({ url, text, emoji = "👀", variant = "default" }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  function handleClick() {
    setOpen(false);

    window.clearTimeout(timerRef.current);

    const formattedText = `${emoji} ${text}`;
    const formattedAuthor = `🙋‍♂️ ${PERSONAL.name}`;
    const formattedUrl = `🔗 ${url}`;

    const copy = `${formattedText}\n${formattedAuthor}\n\n${formattedUrl}`;

    navigator.clipboard.writeText(copy).then(() => {
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    });
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <Toast.Provider label="Share notification" duration={2000}>
      {variant === "icon" ? (
        <StyledIconButton title="Share" onClick={handleClick}>
          <Share2Icon width={18} height={18} aria-hidden />
          <VisuallyHidden.Root>Share</VisuallyHidden.Root>
        </StyledIconButton>
      ) : (
        <Button title="Share" onClick={handleClick}>
          <Box alignItems="center" gap={2}>
            <Share2Icon width={18} height={18} aria-hidden />
            <TextHeadline>Share</TextHeadline>
          </Box>
        </Button>
      )}

      <StyledToastRoot open={open} onOpenChange={setOpen}>
        <Toast.Description>Copied to clipboard!</Toast.Description>
      </StyledToastRoot>

      <StyledToastViewport />
    </Toast.Provider>
  );
}

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

export function PreviewToggle({ pressed, ...props }: ToggleProps & CSS) {
  return (
    <StyledPreviewToggle
      aria-label="Preview toggle"
      pressed={pressed}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {pressed ? (
        <>
          <EyeOpenIcon width={18} height={18} />
          <VisuallyHidden.Root>Description Visible</VisuallyHidden.Root>
        </>
      ) : (
        <>
          <EyeClosedIcon width={18} height={18} />
          <VisuallyHidden.Root>Description Hidden</VisuallyHidden.Root>
        </>
      )}
    </StyledPreviewToggle>
  );
}

export function PrintButton(props) {
  return (
    <StyledIconButton title="Print" onClick={() => window?.print()} {...props}>
      <FileIcon width={18} height={18} />
      <VisuallyHidden.Root>Print</VisuallyHidden.Root>
    </StyledIconButton>
  );
}
