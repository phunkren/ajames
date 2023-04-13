import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

type Scroll = {
  isHeaderActive: boolean;
};

export function useScroll(): Scroll {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isHeaderActive = scrollPosition > 70;
  const { asPath, isReady } = useRouter();

  const handleScrollPosition = useCallback(() => {
    requestAnimationFrame(() => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    });
  }, []);

  const handleSmoothScroll = useCallback((url: string) => {
    const hash = url.split("#")[1];
    const element = document.getElementById(hash);
    element?.scrollIntoView();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, [scrollPosition, handleScrollPosition]);

  useEffect(() => {
    const requestId = requestAnimationFrame(() => {
      isReady && handleSmoothScroll(asPath);
    });

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [isReady, asPath, handleSmoothScroll]);

  return {
    isHeaderActive,
  };
}
