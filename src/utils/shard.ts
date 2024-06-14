import { ShardingManager } from "discord.js";
import { Logger } from "term-logger";

const TOKEN = process.env.DISCORD_TOKEN;

const manager = new ShardingManager("src/main.ts", { token: TOKEN, totalShards: "auto" });

manager.on("shardCreate", (shard) => {
  Logger.complete(`Launched shard ${shard.id}`);
});

manager.spawn();
