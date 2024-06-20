import { db } from "@/db";
import { guild, type SelectGuild } from "@/db/schemas/guild";
import { eq } from "drizzle-orm";
import { isDeveloper } from "@/utils/helpers";
import defineCommand from "@/utils/defineCommand";
import redis from "@/utils/redis";
import crypto from "crypto";

const guildResponse = (data: SelectGuild) => {
  return {
    content: `ID: ${data.id}\nGuild ID: ${data.guildId}\nCreated At: ${data.createdAt}`,
  };
};

export default defineCommand({
  data: {
    name: "guild",
    description: "returns the guild information",
    default_member_permissions: "8",
  },

  execute: async (interaction, client) => {
    // Acknowledge the interaction
    await interaction.deferReply({ ephemeral: true });

    const hasAccess = isDeveloper(interaction.user.id);
    if (!hasAccess) return interaction.editReply("Missing permissions");

    // Check if the guild is cached
    const cachedGuild = await redis.get(`guild:${interaction.guildId}`);

    // If the guild is cached, return the cached guild
    if (cachedGuild) {
      console.log("Cached guild");

      return interaction.editReply(guildResponse(JSON.parse(cachedGuild)));
    } else {
      console.log("Not cached guild");

      // Find the guild in db and cache it
      let guildData = await db.query.guild.findFirst({
        where: eq(guild.guildId, interaction.guildId!),
      });

      if (!guildData) {
        console.log("Guild not found, inserting new guild");

        const newGuild = await db.insert(guild).values({ guildId: interaction.guildId! }).returning();

        guildData = newGuild[0];
      }

      await redis.set(`guild:${interaction.guildId}`, JSON.stringify(guildData)); // Cache the guild

      return interaction.editReply(guildResponse(guildData));
    }
  },
});
