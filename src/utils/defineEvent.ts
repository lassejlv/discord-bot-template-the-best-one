import type { Event } from "../types/Event";

function defineEvent(event: Event) {
  if (!event.name || !event.execute) throw new Error(`Missing name or execute function in ${event}`);
  return event;
}

export default defineEvent;
