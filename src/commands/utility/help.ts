import defineCommand from "@/utils/defineCommand";
import { SlashCommandBuilder } from "discord.js";

export default defineCommand({
  data: new SlashCommandBuilder().setName("help").setDescription("Get help"),

  async execute(interaction) {
    await interaction.reply({ content: "Bro just type `/` to see my commands 🤌", ephemeral: true });
  },
});
