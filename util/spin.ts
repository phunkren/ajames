const MAX_ENTRIES = 100;

export type SpinResult = {
  entries: string[];
  result: string;
};

export class SpinError extends Error {}

export function spin(input: string): SpinResult {
  const entries = input
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (entries.length < 2) {
    throw new SpinError(
      "Provide at least 2 comma-separated entries, e.g. pizza,tacos,sushi"
    );
  }
  if (entries.length > MAX_ENTRIES) {
    throw new SpinError(`Provide at most ${MAX_ENTRIES} entries`);
  }

  const result = entries[Math.floor(Math.random() * entries.length)];

  return { entries, result };
}
