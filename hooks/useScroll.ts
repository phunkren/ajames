import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

type Scroll = {
  isHeaderActive: boolean;
};

export function useScroll(): Scroll {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isHeaderActive = scrollPosition > 70;
  const { asPath } = useRouter();

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

  const handleSmoothScroll = useCallback((url: string) => {
    let scheduledSmoothFrame = false;

    // Prevent multiple rAF callbacks.
    if (scheduledSmoothFrame) return;
    scheduledSmoothFrame = true;

    requestAnimationFrame(() => {
      const hash = url.split("#")[1];
      const element = document.getElementById(hash);
      element?.scrollIntoView();
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, handleScroll]);

  useEffect(() => {
    handleSmoothScroll(asPath);
  }, [asPath, handleSmoothScroll]);

  return {
    isHeaderActive,
  };
}
