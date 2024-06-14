import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import defineCommand from "@/utils/defineCommand";
import { db } from "@/db";
import redis from "@/utils/redis";

export default defineCommand({
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Add the guild to db")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setDMPermission(false),

  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const isCached = await redis.get(`guild:${interaction.guildId!}`);
    if (isCached) return interaction.editReply("Guild is already in the database");
    else {
      const guildData = await db.guild.findUnique({ where: { guildId: interaction.guildId! } });
      if (!guildData) {
        const newGuild = await db.guild.create({
          data: {
            guildId: interaction.guildId!,
          },
        });

        await redis.set(`guild:${interaction.guildId!}`, JSON.stringify(newGuild));
        return interaction.editReply(`Guild has been setup with id: ${newGuild.id}`);
      } else {
        await redis.set(`guild:${interaction.guildId!}`, JSON.stringify(guildData));
        return interaction.editReply("Guild is already in the database");
      }
    }
  },
});
