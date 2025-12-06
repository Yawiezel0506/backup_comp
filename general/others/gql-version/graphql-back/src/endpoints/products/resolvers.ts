import productService from "./services";
import { Product as p, Product, ProductInput } from "../../interfaces/products";
import { addToRedis, existsInRedis } from "../../utils/redis";

export const productResolvers = {
  Query: {
    getAllProducts: async (_: any, { input }: { input?: Product }) => {
      const redisData = await existsInRedis(`products/${input}`);
      if (redisData != null) return redisData;
      const filters = input ? input : {};

      const products = await productService.getAllProducts(filters);
      if (products === "products not found") {
        throw new Error("Something went wrong!");
      }

      await addToRedis(`products/${input}`, products);
      return products;
    },

    getProductById: async (_: any, { id }: { id: string }) => {
      const redisData = await existsInRedis(`product/${id}`);
      if (redisData != null) return redisData;
      const productId = id;

      const product = await productService.getProductById(Number(productId));
      if (!product) {
        throw new Error("Something went wrong!");
      }

      await addToRedis(`product/${id}`, product);
      return product;
    },
  },

  Mutation: {
    updateOrInsert: async (_: any, { input }: { input: p | p[] }) => {
      const body = input ? input : [];

      const product = await productService.updateOrInsert(body);
      if (!product) {
        throw new Error("Something went wrong!");
      }

      return product;
    },
  },
};
