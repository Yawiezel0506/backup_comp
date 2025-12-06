import mongoose, { Schema, Model } from "mongoose";
import { Product, Attributes } from "../interfaces/products";

const attributeSchema: Schema<Attributes> = new Schema<Attributes>({
  key: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
});

const productSchema: Schema<Product> = new Schema<Product>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  attributes: { type: [attributeSchema], required: true },
  clickCount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
});

export const ProductModel: Model<Product> = mongoose.model<Product>(
  "Product",
  productSchema
);
