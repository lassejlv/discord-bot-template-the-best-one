import defineCommand from "@/utils/defineCommand";
import { SlashCommandBuilder } from "discord.js";
import { isDeveloper } from "@/utils/helpers";
import redis from "@/utils/redis";
import { db } from "@/db";

export default defineCommand({
  data: new SlashCommandBuilder().setName("resetcache").setDescription("Reset the cache"),

  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const hasAccess = isDeveloper(interaction.user.id);
    if (!hasAccess) return interaction.editReply("You do not have permission to run this command.");

    // Flush all keys in the cache
    await redis.flushAll();

    // Add guilds to cache
    const guilds = await db.guild.findMany();

    for (const guild of guilds) {
      await redis.set(`guild:${guild.id}`, JSON.stringify(guild));
    }

    return interaction.editReply("Cache has been reset. All guilds have been added to the cache.");
  },
});
