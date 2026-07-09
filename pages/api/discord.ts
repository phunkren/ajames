import type { NextApiRequest, NextApiResponse } from "next";
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from "discord-interactions";
import { waitUntil } from "@vercel/functions";
import { DiceRollError, rollDice } from "../../util/dice";
import { spin, SpinError } from "../../util/spin";

export const config = {
  api: {
    bodyParser: false,
  },
  // The /spin animation sleeps for ~8s plus fetch latency across several
  // edits, which exceeds the platform's default function timeout.
  maxDuration: 15,
};

const SPIN_TOTAL_DURATION_MS = 8000;
const SPIN_FRAME_COUNT = 10;
// Keeps edits comfortably under Discord's rate limit for editing a message.
const SPIN_MIN_FRAME_DELAY_MS = 300;

async function getRawBody(req: NextApiRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomEntry(entries: string[], exclude?: string) {
  const choices = entries.length > 1 ? entries.filter((entry) => entry !== exclude) : entries;
  return choices[Math.floor(Math.random() * choices.length)];
}

function formatSpinningContent(entries: string[], current: string) {
  return `🎡 **${entries.join(", ")}**\n\nSpinning... **${current}**`;
}

function formatSpinResultContent(entries: string[], result: string) {
  return `🎡 **${entries.join(", ")}** → **${result}** 🎉`;
}

// Cubically increasing delays: frames stay fast for most of the spin, then
// the slowdown itself ramps up sharply in the final few frames, roughly
// summing to SPIN_TOTAL_DURATION_MS.
function buildSpinFrameDelays(): number[] {
  const weights = Array.from({ length: SPIN_FRAME_COUNT }, (_, i) => (i + 1) ** 3);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);

  return weights.map((weight) =>
    Math.max(
      SPIN_MIN_FRAME_DELAY_MS,
      Math.round((weight / weightTotal) * SPIN_TOTAL_DURATION_MS)
    )
  );
}

async function editOriginalMessage(
  applicationId: string,
  token: string,
  content: string
) {
  await fetch(
    `https://discord.com/api/v10/webhooks/${applicationId}/${token}/messages/@original`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    }
  );
}

async function animateSpin(
  applicationId: string,
  token: string,
  entries: string[],
  result: string
) {
  let previous = entries[0];
  const delays = buildSpinFrameDelays();

  for (let frame = 0; frame < SPIN_FRAME_COUNT; frame++) {
    await sleep(delays[frame]);

    const isLastFrame = frame === SPIN_FRAME_COUNT - 1;
    const content = isLastFrame
      ? formatSpinResultContent(entries, result)
      : formatSpinningContent(entries, (previous = randomEntry(entries, previous)));

    await editOriginalMessage(applicationId, token, content);
  }
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

    if (interaction.data?.name === "roll") {
      try {
        const dice: string = getOption("dice") ?? "1d20";
        const { result, rolls } = rollDice(dice);
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `🎲 **${dice}** → **${result}** (${rolls.join(", ")})`,
          },
        });
      } catch (error) {
        if (error instanceof DiceRollError) {
          return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `⚠️ ${error.message}` },
          });
        }
        throw error;
      }
    }

    if (interaction.data?.name === "spin") {
      let entries: string[];
      let result: string;

      try {
        const entriesInput: string = getOption("entries");
        ({ entries, result } = spin(entriesInput));
      } catch (error) {
        if (error instanceof SpinError) {
          return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: `⚠️ ${error.message}` },
          });
        }
        throw error;
      }

      // Discord requires the initial ack within 3s, but the original
      // message can be edited afterwards to animate the "spin" without
      // posting extra messages to the channel. waitUntil keeps the
      // function alive to finish those edits after this response returns.
      waitUntil(
        animateSpin(interaction.application_id, interaction.token, entries, result)
      );

      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: formatSpinningContent(entries, randomEntry(entries)),
        },
      });
    }

    return res.status(400).end("Unknown command");
  }

  return res.status(400).end("Unknown interaction");
}
