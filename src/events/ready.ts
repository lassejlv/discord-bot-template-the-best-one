import { Client } from "discord.js";
import defineEvent from "../utils/defineEvent";

export default defineEvent({
  name: "ClientReady",
  once: true,
  execute: (client: Client) => {
    console.log(`Logged in as ${client.user?.tag} (${client.user?.id})`);
    console.log("Run `bun run deploy` to deploy slash-commands.");

    client.user?.setActivity({
      name: "hello?",
      state: "what do you want?",
    });
  },
});
