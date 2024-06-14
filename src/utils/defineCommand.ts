import type { Command } from "../types/Command";

function defineCommand(command: Command) {
  if (!command.data || !command.execute) throw new Error(`Missing data or execute function in ${command}`);
  return command;
}

export default defineCommand;
