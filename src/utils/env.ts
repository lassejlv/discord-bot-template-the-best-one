import { z } from "zod";

const envVariables = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DEVELOPERS: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.number(),
  REDIS_PASSWORD: z.string(),
  TURSO_URL: z.string(),
  TURSO_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
