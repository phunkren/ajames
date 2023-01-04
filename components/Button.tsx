import {
  ButtonHTMLAttributes,
  forwardRef,
  Ref,
  useEffect,
  useState,
} from "react";
import { usePrevious } from "../hooks/usePrevious";
import { styled } from "../stitches.config";
import { Box } from "./Layout";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const StyledButton = styled("button", {
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
