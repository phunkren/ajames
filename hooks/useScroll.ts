import { useState, useEffect } from "react";

type Scroll = {
  isHeaderActive: boolean;
};

export function useScroll(): Scroll {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isHeaderActive = scrollPosition > 70;

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  return {
    isHeaderActive,
  };
}
