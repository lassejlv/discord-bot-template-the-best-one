import { db } from "@/db";
import defineCommand from "@/utils/defineCommand";
import redis from "@/utils/redis";
import { PermissionsBitField, SlashCommandBuilder } from "discord.js";

export default defineCommand({
  // @ts-ignore
  data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Set the welcome channel for the server")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageGuild)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to send the welcome message")
        .setRequired(true)
        .addChannelTypes(0)
    )
    .addStringOption((option) =>
      option.setName("message").setDescription("The welcome message").setRequired(true).setMaxLength(1800)
    ),

  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });

    // Get the channel and message from the interaction
    const channel = interaction.options.getChannel("channel", true);
    const message = interaction.options.getString("message", true);

    const guild = await redis.get(`guild:${interaction.guildId}`);
    if (!guild) return interaction.editReply("The guild is not registered in the database");

    // Update the welcome channel and message
    const updatedGuild = await db.guild.update({
      where: { guildId: interaction.guildId! },
      data: {
        welcomeChannel: channel.id,
        welcomeMessage: message,
      },
    });

    await redis.set(`guild:${interaction.guildId}`, JSON.stringify(updatedGuild));

    await interaction.editReply(`Welcome channel set to <#${channel.id}> with the message: ${message}`);
  },
});
