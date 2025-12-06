import axios from "axios";
import dotenv from "dotenv";
import { addToRedis, existsInRedis } from "../../utils/redis";

dotenv.config();

const BANNERS_SERVER =
  process.env.BANNERS_SERVER || "https://serverbanners.onrender.com";

const getByCategory = async (category: string) => {
  try {
    const redisData = await existsInRedis(`banner/${category}`)
    if (redisData != null) return redisData
    const resp = await axios.get(`${BANNERS_SERVER}/banners/cat/${category}`);
    await addToRedis(`banner/${category}`, resp.data)
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllBanners = async () => {
  try {
    const redisData = await existsInRedis("allBanners")
    if (redisData != null) return redisData
    const resp = await axios.get(`${BANNERS_SERVER}/banners/`);
    await addToRedis("allBanners", resp.data)
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getByCategory,
  getAllBanners,
};
