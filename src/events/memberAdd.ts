import defineEvent from "@/utils/defineEvent";
import redis from "@/utils/redis";
import type { Guild } from "@prisma/client";
import { ChannelType, Events, GuildMember } from "discord.js";

export default defineEvent({
  name: Events.GuildMemberAdd,
  once: false,

  execute: async (member: GuildMember) => {
    const guild = await redis.get(`guild:${member.guild.id}`);
    if (!guild) return;

    const parsedGuild = JSON.parse(guild) as Guild;

    const channel = member.guild.channels.cache.get(parsedGuild.welcomeChannel!);
    if (!channel || channel.type !== ChannelType.GuildText) return;
    const message = parsedGuild.welcomeMessage?.replace(/{member}/g, member.toString())!;

    try {
      await channel.send(message);
    } catch (error: any) {
      return console.error(error.message);
    }
  },
});
