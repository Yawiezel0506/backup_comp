import { ProductModel } from "../../models/product";

export const getAllProducts = async () => {
  try {
    const result = await ProductModel.find({});
    return result;
    // const products = results.map((document) => document.toObject());
    // return products;
  } catch (error) {
    throw error;
  }
};
