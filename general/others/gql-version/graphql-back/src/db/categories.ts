import mongoose, {Schema, Model} from "mongoose";
import { Category } from "../interfaces/category";

const categorySchema: Schema<Category> = new Schema<Category>({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    clicks: {
        type: Number,
        require: true
    }
  });

  export const CategoryModel: Model<Category> = mongoose.model<Category>(
    "Category",
    categorySchema
  );