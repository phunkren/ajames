import type { NextApiRequest, NextApiResponse } from "next";
import { spin, SpinError, SpinResult } from "../../util/spin";

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpinResult | ErrorResponse>
) {
  const entries = req.query.entries;

  if (typeof entries !== "string") {
    return res
      .status(400)
      .json({ error: "Missing 'entries' query param, e.g. ?entries=pizza,tacos,sushi" });
  }

  try {
    const result = spin(entries);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof SpinError) {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
}
