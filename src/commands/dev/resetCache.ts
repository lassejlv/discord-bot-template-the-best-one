import defineCommand from "@/utils/defineCommand";
import { SlashCommandBuilder } from "discord.js";
import redis from "@/utils/redis";
import { isDeveloper } from "@/utils/helpers";

export default defineCommand({
  data: new SlashCommandBuilder().setName("resetcache").setDescription("Reset the cache"),

  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const hasAccess = isDeveloper(interaction.user.id);
    if (!hasAccess) return interaction.editReply("You do not have permission to run this command.");

    await redis.flushAll();
    await interaction.editReply("Cache has been reset.");
  },
});
