import { drizzle } from "drizzle-orm/node-postgres";
import * as guild from "./schemas/guild";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_DATABASE_URL,
});

export const db = drizzle(pool, { schema: { ...guild } });
