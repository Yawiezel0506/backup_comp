import { addToRedis, existsInRedis } from "../../utils/redis";
import getAllPopular from "./service";

export const populerResolvers = {
  Query: {
    getAllPopulars: async () => {
      const redisData = await existsInRedis("popular");
      if (redisData != null) return redisData;
      const populars = await getAllPopular();
      if (typeof populars === "string") {
        throw new Error("cart of this user not found");
      }
      console.log(populars);

      await addToRedis("popular", populars);
      return populars;
    },
  },
};
