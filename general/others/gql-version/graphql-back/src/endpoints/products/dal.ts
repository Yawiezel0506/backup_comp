import { ProductModel } from "../../db/products";
import { Product } from "../../interfaces/products";
import axios from "axios";

export const updateQuantity = async (result: Product[]) => {
  for (const item of result) {
    if (item.quantity < 20) {
      try {
        const res = await axios.post(
          `https://erp-beak1-6.onrender.com/products/shop_inventory/updateInventory/${item.id}`,
          {
            operation: 20
          }
        );
        if (res.data) {
          const update = await ProductModel.findOneAndUpdate(
            { id: item.id },
            {
              $inc: { quantity: 20 },
            }
          );
          if (update) item.quantity += 20;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  return result;
};

const getAllProducts = async () => {
  try {
    const result = await ProductModel.find({});
    return result;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id: number) => {
  try {
    const result = await ProductModel.findOne({ id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateOrInsert = async (body: Product | Product[]) => {
  try {
    if (Array.isArray(body)) {
      for (const item of body) {
        const result = await ProductModel.findOneAndUpdate(
          { id: item.id },
          { $inc: { quantity: item.quantity } },
          { new: true }
        );
        if (result === null) {
          const newProduct = new ProductModel(item);
          await newProduct.save();
        }
      }
    } else {
      const result = await ProductModel.findOneAndUpdate(
        { id: body.id },
        { $inc: { quantity: body.quantity } },
        { new: true }
      );
      if (result === null) {
        const newProduct = new ProductModel(body);
        await newProduct.save();
      }
    }
    return "cool";
  } catch (err) {
    throw err;
  }
};

const productsDal = {
  getAllProducts,
  getProductById,
  updateOrInsert,
};

export default productsDal;
