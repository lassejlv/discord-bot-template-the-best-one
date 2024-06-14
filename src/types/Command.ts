import type { SlashCommandBuilder } from "discord.js";
import type { SlashCommandProps } from "commandkit";

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: SlashCommandProps["interaction"], client: SlashCommandProps["client"]) => void;
}
