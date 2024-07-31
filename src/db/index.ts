import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const client = createClient({
  url: process.env.TURSO_URL,
  // authToken: process.env.TURSO_TOKEN,
});

const adapter = new PrismaLibSQL(client);
export const prisma = new PrismaClient({ adapter });
