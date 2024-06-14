import { SlashCommandBuilder } from "discord.js";
import defineCommand from "@/utils/defineCommand";

export default defineCommand({
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),

  execute: async (interaction, client) => {
    await interaction.reply("Pong!");
  },
});
