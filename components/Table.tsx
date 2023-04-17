import { styled } from "../stitches.config";

export const Table = styled("table", {
  borderCollapse: "collapse",
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "$foreground",
  boxShadow: "$1",
});

export const THead = styled("thead", {
  color: "$foreground",
  position: "relative",
});

export const TBody = styled("tbody", {});

export const TFoot = styled("tfoot", {});

export const Tr = styled("tr", {});

export const Th = styled("th", {
  padding: "$2 $3",
  backgroundColor: "$backgroundMuted",
  borderRightWidth: 1,
  borderBottomWidth: 2,
  borderLeftWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
});

export const Td = styled("td", {
  padding: "$2 $3",
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "$foregroundMuted",
});
