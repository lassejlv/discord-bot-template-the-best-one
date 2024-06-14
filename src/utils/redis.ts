import { createClient } from "redis";

const redis = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redis.on("error", async (error) => {
  console.error(`Redis error: ${error}`);

  redis.disconnect();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  redis.connect();
});

if (!redis.isOpen) {
  await redis.connect();
}

export default redis;
