// Registers/updates the Discord slash commands for this app.
// Requires DISCORD_APP_ID and DISCORD_BOT_TOKEN env vars.
// Run with: node scripts/register-discord-commands.js

const APP_ID = process.env.DISCORD_APP_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!APP_ID || !BOT_TOKEN) {
  console.error("Missing DISCORD_APP_ID or DISCORD_BOT_TOKEN env vars");
  process.exit(1);
}

const commands = [
  {
    name: "roll",
    description: "Roll some dice, e.g. 2d6",
    options: [
      {
        name: "dice",
        description: "Dice notation, e.g. 2d6",
        type: 3, // STRING
        required: true,
      },
    ],
  },
];

async function main() {
  const res = await fetch(
    `https://discord.com/api/v10/applications/${APP_ID}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    }
  );

  if (!res.ok) {
    console.error(`Failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  console.log("Registered commands:", await res.json());
}

main();
