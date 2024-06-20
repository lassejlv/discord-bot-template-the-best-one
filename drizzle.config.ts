import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./src/db/schemas/**/*",
//   out: "./src/db/migrations",
//   dialect: "sqlite",
//   driver: "turso",
//   dbCredentials: {
//     url: process.env.TURSO_CONNECTION_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN!,
//   },
// });

export default defineConfig({
  schema: "./src/db/schemas/**/*",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_DATABASE_URL!,
  },
});
