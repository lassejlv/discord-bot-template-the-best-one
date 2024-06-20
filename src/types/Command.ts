import type { ChatInputCommandInteraction, Client, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";

export interface Command {
  data: RESTPostAPIApplicationCommandsJSONBody;
  execute: (interaction: ChatInputCommandInteraction, client: Client<true>) => void;
}
