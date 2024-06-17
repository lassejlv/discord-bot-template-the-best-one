import client from "@/main";
import defineEvent from "@/utils/defineEvent";
import { commands } from "@/utils/loaders";
import type { CacheType, Client, Interaction } from "discord.js";
import redis from "@/utils/redis";

export default defineEvent({
  name: "InteractionCreate",
  once: false,

  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    // Get the command from the collection
    const command = commands.get(interaction.commandName);
    if (!command) return;

    // Cooldown
    const hasCooldown = await redis.get(`cooldown:${interaction.user.id}:${command.data.name}`);
    if (hasCooldown) return interaction.reply({ content: "You're on cooldown", ephemeral: true });
    else {
      const key = `cooldown:${interaction.user.id}:${command.data.name}`;
      await redis.set(key, "true");
      await redis.expire(key, 6);
    }

    try {
      command.execute(interaction, client as Client<true>);
    } catch (error: any) {
      console.error(error.message);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "An error occurred while executing this command",
          ephemeral: true,
        });
      }
    }
  },
});
