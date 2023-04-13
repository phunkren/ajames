import { useState, useEffect, useCallback } from "react";

type Scroll = {
  isHeaderActive: boolean;
};

export function useScroll(): Scroll {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isHeaderActive = scrollPosition > 70;

  const handleScroll = useCallback(() => {
    let scheduledAnimationFrame = false;

    // Prevent multiple rAF callbacks.
    if (scheduledAnimationFrame) return;
    scheduledAnimationFrame = true;

    requestAnimationFrame(() => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return {
    isHeaderActive,
  };
}
