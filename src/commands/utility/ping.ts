import defineCommand from "@/utils/defineCommand";
import { ApplicationCommandOptionType } from "discord.js";

export default defineCommand({
  data: {
    name: "ping",
    description: "Replies with Pong!",
    options: [
      {
        name: "ephemeral",
        description: "choose if the reply should be ephemeral",
        type: ApplicationCommandOptionType.Boolean,
        required: true,
      },
    ],
  },

  execute: async (interaction, client) => {
    const ephemeral = interaction.options.getBoolean("ephemeral", true);

    await interaction.reply({
      content: "Pong!",
      ephemeral,
    });
  },
});
