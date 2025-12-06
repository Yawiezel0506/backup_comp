import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
 
export const redis = new Redis({
  port: Number(REDIS_PORT) || 18658,
  host: REDIS_HOST || "redis-18658.c243.eu-west-1-3.ec2.cloud.redislabs.com",
  username: "default",
  password: REDIS_PASSWORD || "IgY4brYzd6Uui6t139UPAa6ra692JLQH",
  db: 0,
});

console.log(`🚀 Redis is connected!!`);