import { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setFullViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${viewportHeight}px`);
    };

    setFullViewportHeight();

    window.addEventListener("resize", setFullViewportHeight);
    return () => window.removeEventListener("resize", setFullViewportHeight);
  }, []);
};

export default useViewportHeight;
