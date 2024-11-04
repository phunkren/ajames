import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Layout = "grid" | "rows";

type LayoutValue = [Layout, (newLayout: Layout) => void];

// Create a hook to easily consume the theme context
export function useLayoutToggle() {
  const [storageLayout, setStorageLayout] = useLocalStorage<Layout>(
    "layout",
    "rows"
  );

  const [layout, setLayout] = useState<Layout>();

  const handleLayoutChange = useCallback(
    (newLayout: Layout) => {
      setLayout(newLayout);
      setStorageLayout(newLayout);
    },
    [setStorageLayout]
  );

  const value: LayoutValue = useMemo(
    () => [layout, handleLayoutChange],
    [layout, handleLayoutChange]
  );

  useEffect(() => {
    if (storageLayout) {
      setLayout(storageLayout);
    } else {
      handleLayoutChange("grid");
    }
  }, [storageLayout, handleLayoutChange]);

  // Return the context provider with the current theme value
  return value;
}
