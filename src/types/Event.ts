import type { Events } from "discord.js";

export interface Event {
  name: keyof typeof Events;
  once?: boolean;
  execute: (...args: any[]) => void;
}
