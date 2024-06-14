import { createClient } from "redis";

const PASSWORD = process.env.REDIS_PASSWORD;
const HOST = process.env.REDIS_HOST;
const PORT = parseInt(process.env.REDIS_PORT!);

if (!PASSWORD || !HOST || !PORT) throw new Error("Missing Redis environment variables");

const redis = createClient({
  password: PASSWORD,
  socket: {
    host: HOST,
    port: PORT,
  },
});

redis.on("error", async (error) => {
  console.error(`Redis error: ${error}`);

  redis.disconnect();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redis.connect();
});

redis.on("connect", () =>
  console.log(`Connected to Redis at ${HOST.replace(/\w/g, "*")}:${PORT} on ${new Date().toISOString()}`)
);

if (!redis.isOpen) {
  await redis.connect();
}

export default redis;
