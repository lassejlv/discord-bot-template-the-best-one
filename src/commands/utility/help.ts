import defineCommand from "@/utils/defineCommand";

export default defineCommand({
  data: {
    name: "help",
    description: "Get help with the bot",
  },

  execute(interaction, client) {
    interaction.reply("Help command!");
  },
});
