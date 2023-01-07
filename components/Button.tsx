import {
  ButtonHTMLAttributes,
  forwardRef,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import * as Toast from "@radix-ui/react-toast";
import { Share1Icon } from "@radix-ui/react-icons";
import { usePrevious } from "../hooks/usePrevious";
import { styled } from "../stitches.config";
import { Box } from "./Layout";
import { TextAux, TextBody, TextHeadline } from "./Text";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { PERSONAL } from "../util/data";

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

const StyledToastViewport = styled(Toast.Viewport, {
  position: "fixed",
  top: "10vh",
  right: 0,
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
});

const StyledToastRoot = styled(Toast.Root, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  padding: 15,
  display: "grid",
  gridTemplateAreas: '"title action" "description action"',
  gridTemplateColumns: "auto max-content",
  columnGap: 15,
  alignItems: "center",

  '&[data-swipe="move"]': {
    transform: "translateX(var(--radix-toast-swipe-move-x))",
  },
  '&[data-swipe="cancel"]': {
    transform: "translateX(0)",
    transition: "transform 200ms ease-out",
  },
});

const StyledScrollToTop = styled(Box, {
  position: "fixed",
  left: "50%",
  background: "red",
  transform: "translateX(-50%)",
  padding: "$4",

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

export const Button = forwardRef(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    return <StyledButton ref={ref} type="button" {...props} />;
  }
);

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
    <StyledScrollToTop aria-hidden active={isButtonActive}>
      <Button onClick={handleScrollToTop}>Scroll to top</Button>
    </StyledScrollToTop>
  );
}

const StyledShareButton = styled(Button, {
  background: "white",
  color: "black",
  borderRadius: "50%",
  spacing: "$2",

  "@bp2": {
    gap: "$2",
    padding: "$2 $4",
    borderRadius: 4,
  },
});

export function ShareButton({ url, text, emoji = "👀" }) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  function handleClick() {
    setOpen(false);

    window.clearTimeout(timerRef.current);

    const formattedText = `${emoji} ${text}`;
    const formattedAuthor = `🙋‍♂️ ${PERSONAL.name}`;
    const formattedUrl = `🔗 ${url}`;

    const copy = `${formattedText}\n${formattedAuthor}\n\n${formattedUrl}`;

    navigator.clipboard.writeText(copy).then(
      () =>
        (timerRef.current = window.setTimeout(() => {
          setOpen(true);
        }, 100)),
      () => window.alert("Uh-oh! Something went wrong! Please try again.")
    );
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider label="Share notification" duration={2000}>
      <StyledShareButton onClick={handleClick}>
        <Share1Icon width={18} height={18} aria-hidden />

        <VisuallyHidden.Root>Share</VisuallyHidden.Root>

        <TextAux css={{ display: "none", "@bp2": { display: "initial" } }}>
          Share
        </TextAux>
      </StyledShareButton>

      <StyledToastRoot open={open} onOpenChange={setOpen}>
        <Toast.Description>Copied to clipboard!</Toast.Description>
      </StyledToastRoot>

      <StyledToastViewport />
    </Toast.Provider>
  );
}
