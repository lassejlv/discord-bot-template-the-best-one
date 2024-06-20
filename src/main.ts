import { Client, GatewayIntentBits } from "discord.js";
import { loadCommands, loadEvents } from "./utils/loaders";
import redis from "./utils/redis";

export const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((key) => GatewayIntentBits[key as keyof typeof GatewayIntentBits]),
});

await redis.flushAll();

loadCommands("./src/commands/**/*.ts");
loadEvents("./src/events/**/*.ts");

client.login(process.env.DISCORD_TOKEN);
