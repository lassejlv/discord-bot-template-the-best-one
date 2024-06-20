import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schemas/**/*",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_DATABASE_URL!,
  },
});
