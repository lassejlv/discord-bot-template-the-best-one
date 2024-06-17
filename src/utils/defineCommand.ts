import { z } from "zod";
import type { Command } from "../types/Command";

const CommandSchema = z.object({
  data: z.object({
    name: z.string(),
    description: z.string(),
  }),
  execute: z.function(),
});

function defineCommand(command: Command) {
  const result = CommandSchema.safeParse(command);
  if (!result.success) throw new Error(result.error.message);

  return command;
}

export default defineCommand;
