import { ShardingManager } from "discord.js";
import { Logger } from "term-logger";

const manager = new ShardingManager("src/main.ts", { token: process.env.DISCORD_TOKEN, totalShards: "auto" });

manager.on("shardCreate", (shard) => {
  Logger.complete(`Launched shard ${shard.id}`);
});

manager.spawn();
