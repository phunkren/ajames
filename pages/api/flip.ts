import type { NextApiRequest, NextApiResponse } from "next";
import { flip, FlipResult } from "../../util/flip";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FlipResult>
) {
  res.status(200).json(flip());
}
