import type { Events } from "discord.js";

export interface Event {
  name: Events;
  once: boolean;
  execute: (...args: any[]) => void;
}
