import { Client, GatewayIntentBits, type ClientEvents, Collection, Events } from "discord.js";
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

  const eventName = Events[name as keyof typeof Events] as keyof ClientEvents;

  if (!name || !execute) throw new Error(`Missing name or execute function in ${filePath}`);

  if (once) {
    client.once(eventName, (...args) => execute(client, ...args));
  } else {
    client.on(eventName, (...args) => execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);

export default client;
