import { z } from "zod";
import type { Event } from "../types/Event";

const EventSchema = z.object({
  name: z.string(),
  once: z.boolean().optional(),
  execute: z.function(),
});

function defineEvent(event: Event) {
  const result = EventSchema.safeParse(event);
  if (!result.success) throw new Error(result.error.message);

  return event;
}

export default defineEvent;
