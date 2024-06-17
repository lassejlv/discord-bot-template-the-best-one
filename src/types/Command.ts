import type { SlashCommandProps } from "commandkit";
import type { Client, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export interface Command {
  data: RESTPostAPIApplicationCommandsJSONBody;
  execute: (interaction: SlashCommandProps["interaction"], client: Client<true>) => void;
}
