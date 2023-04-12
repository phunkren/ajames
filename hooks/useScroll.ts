import { useState, useEffect } from "react";

type Scroll = {
  isScrolled: boolean;
  direction: "up" | "down" | null;
};

export function useScroll(): Scroll {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      if (currentPosition > scrollPosition) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return {
    isScrolled: scrollPosition > 0,
    direction,
  };
}
