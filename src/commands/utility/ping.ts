import defineCommand from "@/utils/defineCommand";

export default defineCommand({
  data: {
    name: "ping",
    description: "Replies with Pong!",
  },

  execute: async (interaction, client) => {
    await interaction.deferReply();
    const ws = client.ws.ping;

    await interaction.editReply({
      content: `Pong in ${ws}ms!`,
    });
  },
});
