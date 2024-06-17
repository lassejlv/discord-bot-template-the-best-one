import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands, loadEvents } from "./utils/loaders";

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((key) => GatewayIntentBits[key as keyof typeof GatewayIntentBits]),
});

loadCommands("./src/commands/**/*.ts");
loadEvents("./src/events/**/*.ts");

client.login(process.env.DISCORD_TOKEN);

export default client;
