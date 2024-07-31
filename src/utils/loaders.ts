import path from "path";
import { client } from "@/main";
import type { Command } from "@/types/Command";
import { Glob } from "bun";
import { Collection, Events, type ClientEvents } from "discord.js";

const commands = new Collection<string, Command>();

const loadCommands = async (pathToSearch: string) => {
  const commandsGlob = new Glob(pathToSearch);

  for await (const file of commandsGlob.scan(".")) {
    const filePath = path.resolve(process.cwd(), file);
    const { data, execute } = await import(filePath).then((m) => m.default);

    if (!data || !execute)
      throw new Error(`Missing data or execute function in ${file}`);

    commands.set(data.name, { data, execute });
  }
};

const loadEvents = async (pathToSearch: string) => {
  const eventsGlob = new Glob(pathToSearch);

  // Get all events
  for await (const file of eventsGlob.scan(".")) {
    const filePath = path.resolve(process.cwd(), file);
    const { name, once, execute } = await import(filePath).then(
      (m) => m.default
    );

    const eventName = Events[name as keyof typeof Events] as keyof ClientEvents;

    if (!name || !execute)
      throw new Error(`Missing name or execute function in ${filePath}`);

    if (once) {
      client.once(eventName, (...args) => execute(client, ...args));
    } else {
      client.on(eventName, (...args) => execute(...args));
    }
  }
};

export { loadCommands, loadEvents, commands };
