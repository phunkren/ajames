import type { NextApiRequest, NextApiResponse } from "next";
import { spinWheel, WheelResult, WheelSpinError } from "../../util/wheel";

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WheelResult | ErrorResponse>
) {
  const entries = req.query.entries;

  if (typeof entries !== "string") {
    return res
      .status(400)
      .json({ error: "Missing 'entries' query param, e.g. ?entries=pizza,tacos,sushi" });
  }

  try {
    const spin = spinWheel(entries);
    res.status(200).json(spin);
  } catch (error) {
    if (error instanceof WheelSpinError) {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
}
