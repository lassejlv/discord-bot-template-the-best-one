import { Client, GatewayIntentBits, Collection, Events } from "discord.js";
import { Glob } from "bun";
import path from "path";
import type { Command } from "./types/Command";

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((key) => GatewayIntentBits[key as keyof typeof GatewayIntentBits]),
});

export const commands = new Collection<string, Command>();

const commandsGlob = new Glob("./src/commands/**/*.ts");
const eventsGlob = new Glob("./src/events/**/*.ts");

// Get all commands
for await (const file of commandsGlob.scan(".")) {
  const filePath = path.resolve(process.cwd(), file);
  const { data, execute } = await import(filePath).then((m) => m.default);

  if (!data || !execute) throw new Error(`Missing data or execute function in ${file}`);

  commands.set(data.name, { data, execute });
}

// Get all events
for await (const file of eventsGlob.scan(".")) {
  const filePath = path.resolve(process.cwd(), file);
  const { name, once, execute } = await import(filePath).then((m) => m.default);

  console.log(name, once, execute);

  if (!name || !execute) throw new Error(`Missing name or execute function in ${filePath}`);

  if (once) {
    client.once(name, (...args) => execute(client, ...args));
  } else {
    client.on(name, (...args) => execute(...args));
  }
}

// Handle commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // Get the command from the collection
  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    command.execute(interaction);
  } catch (error: any) {
    console.error(error.message);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "An error occurred while executing this command",
        ephemeral: true,
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
