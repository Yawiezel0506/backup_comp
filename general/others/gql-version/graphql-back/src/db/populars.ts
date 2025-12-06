import mongoose, {Schema, Model} from "mongoose";

interface PopularProduct {
    id: string
    quantity: number
}

const PopularSchema: Schema<PopularProduct> = new Schema<PopularProduct>({
    id: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
  });

  export const PopularModel: Model<PopularProduct> = mongoose.model<PopularProduct>(
    "populers",
    PopularSchema
  );