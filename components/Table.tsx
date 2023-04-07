import { styled } from "../stitches.config";

export const Table = styled("table", {
  borderCollapse: "collapse",
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
  boxShadow: "$1",
});

export const THead = styled("thead", {
  color: "$foreground",
  position: "relative",

  // "&::before": {
  //   content: "",
  //   position: "absolute",
  //   borderTopLeftRadius: "$1",
  //   borderTopRightRadius: "$1",
  //   inset: 0,
  //   background: `radial-gradient(circle at bottom, $hover, $focus)`,
  //   opacity: 0.25,
  //   transition: "opacity 200ms ease-out",
  //   willChange: "opacity",
  //   zIndex: -1,
  // },
});

export const TBody = styled("tbody", {});

export const TFoot = styled("tfoot", {});

export const Tr = styled("tr", {});

export const Th = styled("th", {
  padding: "$2 $3",
  color: "unset",
  backgroundImage: `radial-gradient(circle at bottom, $hover, $focus)`,
  backgroundClip: "text",
  ["-webkit-text-fill-color"]: "transparent",
});

export const Td = styled("td", {
  padding: "$2 $3",
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
});