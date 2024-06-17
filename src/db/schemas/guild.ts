import { sql } from "drizzle-orm";
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const guild = sqliteTable("guilds", {
  id: text("id").primaryKey(),
  guildId: text("guild_id").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
});

export type InsertGuild = typeof guild.$inferInsert;
export type SelectGuild = typeof guild.$inferSelect;
