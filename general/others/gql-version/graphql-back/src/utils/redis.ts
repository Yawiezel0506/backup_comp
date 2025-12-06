import { redis } from "./redisConnect";

export const existsInRedis = async (key: string) => {
  const response = await redis.get(key);
  return response !== null ? JSON.parse(response) : null;
};

export const addToRedis = async (key: string, value: any) => {
  const response = await redis.setex(key, 300, JSON.stringify(value));
  return response;
};

export const closeRedis = async () => {
  await redis.quit();
};
