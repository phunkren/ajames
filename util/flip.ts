export type FlipResult = {
  result: "heads" | "tails";
};

export function flip(): FlipResult {
  const result = Math.random() < 0.5 ? "heads" : "tails";
  return { result };
}
