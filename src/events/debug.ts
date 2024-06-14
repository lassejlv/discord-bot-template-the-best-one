import defineEvent from "@/utils/defineEvent";
import { Events } from "discord.js";
import { Logger } from "term-logger";

export default defineEvent({
  name: Events.Debug,
  once: false,
  execute: (event) => {
    if (process.env.LOG_LEVEL === "debug") {
      Logger.debug(`Event: ${event}`);
    }
  },
});
