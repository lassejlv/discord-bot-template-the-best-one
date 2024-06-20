import { Glob } from "bun";
import { REST, Routes } from "discord.js";
import type { Command } from "@/types/Command";
import path from "path";
import ora from "ora";

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const commands: Command[] = [];
const commandsGlob = new Glob("./src/commands/**/*.ts");

// Get all commands
for await (const file of commandsGlob.scan(".")) {
  const filePath = path.resolve(process.cwd(), file);
  const { data, execute } = await import(filePath).then((m) => m.default);

  if (!data || !execute) throw new Error(`Missing data or execute function in ${filePath}`);

  commands.push(data);
}

// Deploy commands to discord
const rest = new REST().setToken(TOKEN!);

// Start spinner
const spinner = ora("Started deploying commands...").start();

try {
  await rest.put(Routes.applicationCommands(CLIENT_ID!), { body: commands });

  spinner.succeed(`Successfully deployed ${commands.length} command(s)`);

  process.exit(0);
} catch (error) {
  spinner.fail(`Failed to deploy commands: ${error}`);
}
