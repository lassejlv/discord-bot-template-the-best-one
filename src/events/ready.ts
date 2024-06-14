import { Client, Events } from "discord.js";
import defineEvent from "../utils/defineEvent";

export default defineEvent({
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Logged in as ${client.user?.tag} (${client.user?.id})`);
    console.log("Run `bun run deploy` to deploy slash-commands.");

    client.user?.setActivity({
      name: "/help for commands lol",
    });
  },
});
