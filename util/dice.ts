const DICE_PATTERN = /^(\d+)?d(\d+)$/i;
const MAX_DICE = 100;
const MAX_SIDES = 1000;

export type RollResult = {
  dice: string;
  result: number;
  rolls: number[];
};

export class DiceRollError extends Error {}

export function rollDice(dice: string): RollResult {
  const match = dice.match(DICE_PATTERN);
  if (!match) {
    throw new DiceRollError("Invalid 'dice' format, expected e.g. 2d6 or d20");
  }

  const count = match[1] ? parseInt(match[1], 10) : 1;
  const sides = parseInt(match[2], 10);

  if (count < 1 || count > MAX_DICE) {
    throw new DiceRollError(`Dice count must be between 1 and ${MAX_DICE}`);
  }
  if (sides < 1 || sides > MAX_SIDES) {
    throw new DiceRollError(`Dice sides must be between 1 and ${MAX_SIDES}`);
  }

  const rolls = Array.from(
    { length: count },
    () => Math.floor(Math.random() * sides) + 1
  );
  const result = rolls.reduce((sum, roll) => sum + roll, 0);

  return { dice, result, rolls };
}
