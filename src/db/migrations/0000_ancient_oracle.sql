CREATE TABLE `guilds` (
	`id` text PRIMARY KEY NOT NULL,
	`guild_id` text NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer
);
