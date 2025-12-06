import cartService from "./services";
import {
  AddToCart,
  Cart,
  ProductToDelete,
  UpdateQuantity,
} from "../../interfaces/cart";
import { addToRedis, existsInRedis } from "../../utils/redis";

type Result = Cart | null | string;

export const cartResolvers = {
  Query: {
    cart: async (_: any, args: { id: string }) => {
      const { id } = args;
      const redisData = await existsInRedis(`cart/${id}`);
      if (redisData != null) return redisData;
      const userId: string | null = id;
      if (!userId) {
        return "no user specified";
      }
      const cart: Result = await cartService.getCart(userId);
      if (cart === "No Cart found") {
        throw new Error("cart of this user not found");
      }
      await addToRedis(`cart/${id}`, cart)
      return cart;
    },
  },
  Mutation: {
    addToCart: async (_: any, { input }: { input: AddToCart }) => {
      const user = input.userId;

      if (!user) {
        throw new Error("userId is required");
      }

      const cart: AddToCart = input;

      const cartToAdd = await cartService.addProduct(cart);
      if (!cartToAdd) throw new Error("cart of this user not found");
      console.log(cartToAdd);

      return cartToAdd;
    },

    updateQuantity: async (_: any, { input }: { input: UpdateQuantity }) => {
      const user: string = input.userId;
      if (!user) {
        throw new Error("userId is required");
      }

      const ProductOfCart = input;

      const cart: Result = await cartService.updateQuantity(ProductOfCart);

      if (!cart) {
        throw new Error("cart of this user not found");
      }

      return cart;
    },

    deleteCart: async (_: any, { id }: { id: string }) => {
      const user = id;
      if (!user) {
        throw new Error("userId is required");
      }

      const cartToDelete = await cartService.deleteCart(user);

      if (!cartToDelete) throw new Error("cart of this user not found");

      return cartToDelete;
    },

    deleteProduct: async (_: any, { input }: { input: ProductToDelete }) => {
      const user = input.userId;
      console.log(user);

      if (!user) {
        throw new Error("userId is required");
      }

      const productToDelete: ProductToDelete = input;

      const result = await cartService.deleteProductInCart(productToDelete);

      if (!productToDelete) throw new Error("cart of this user not found");
      return result;
    },
  },
};
