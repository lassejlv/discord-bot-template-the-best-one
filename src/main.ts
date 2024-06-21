import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands, loadEvents } from "./utils/loaders";

export const client = new Client({
  intents: [],
});

loadCommands("./src/commands/**/*.ts");
loadEvents("./src/events/**/*.ts");

client.login(process.env.DISCORD_TOKEN);
