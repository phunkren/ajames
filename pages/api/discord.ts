import type { NextApiRequest, NextApiResponse } from "next";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { DiceRollError, rollDice } from "../../util/dice";
import { spinWheel, WheelSpinError } from "../../util/wheel";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  const publicKey = process.env.DISCORD_PUBLIC_KEY;

  if (
    typeof signature !== "string" ||
    typeof timestamp !== "string" ||
    !publicKey
  ) {
    return res.status(401).end("Missing signature headers");
  }

  const rawBody = await getRawBody(req);
  const isValid = await verifyKey(rawBody, signature, timestamp, publicKey);

  if (!isValid) {
    return res.status(401).end("Invalid request signature");
  }

  const interaction = JSON.parse(rawBody);

  if (interaction.type === InteractionType.PING) {
    return res.status(200).json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const getOption = (name: string) =>
      interaction.data.options?.find((option: any) => option.name === name)
        ?.value;

    try {
      let content: string;

      if (interaction.data?.name === "roll") {
        const dice: string = getOption("dice") ?? "1d20";
        const { result, rolls } = rollDice(dice);
        content = `🎲 **${dice}** → **${result}** (${rolls.join(", ")})`;
      } else if (interaction.data?.name === "spin") {
        const entriesInput: string = getOption("entries");
        const { entries, result } = spinWheel(entriesInput);
        content = `🎡 **${entries.join(", ")}** → **${result}**`;
      } else {
        return res.status(400).end("Unknown command");
      }

      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content },
      });
    } catch (error) {
      if (error instanceof DiceRollError || error instanceof WheelSpinError) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: `⚠️ ${error.message}` },
        });
      }
      throw error;
    }
  }

  return res.status(400).end("Unknown interaction");
}
