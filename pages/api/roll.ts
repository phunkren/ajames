import type { NextApiRequest, NextApiResponse } from "next";
import { DiceRollError, rollDice, RollResult } from "../../util/dice";

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RollResult | ErrorResponse>
) {
  const dice = req.query.dice;

  if (typeof dice !== "string") {
    return res.status(400).json({ error: "Missing 'dice' query param, e.g. ?dice=2d6" });
  }

  try {
    const roll = rollDice(dice);
    res.status(200).json(roll);
  } catch (error) {
    if (error instanceof DiceRollError) {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
}
