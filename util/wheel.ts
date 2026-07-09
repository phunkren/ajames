const MAX_ENTRIES = 100;

export type WheelResult = {
  entries: string[];
  result: string;
};

export class WheelSpinError extends Error {}

export function spinWheel(input: string): WheelResult {
  const entries = input
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (entries.length < 2) {
    throw new WheelSpinError(
      "Provide at least 2 comma-separated entries, e.g. pizza,tacos,sushi"
    );
  }
  if (entries.length > MAX_ENTRIES) {
    throw new WheelSpinError(`Provide at most ${MAX_ENTRIES} entries`);
  }

  const result = entries[Math.floor(Math.random() * entries.length)];

  return { entries, result };
}
