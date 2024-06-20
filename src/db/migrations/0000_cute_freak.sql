CREATE TABLE IF NOT EXISTS "guilds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guild_id" text NOT NULL,
	"created_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	"updated_at" text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
