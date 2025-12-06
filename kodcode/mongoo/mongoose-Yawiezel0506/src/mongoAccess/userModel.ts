import { any } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id?: mongoose.ObjectId;
  email: string;
  password: string;
  product?: any;
}


const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  }
});

export const UserModel = mongoose.model<IUser>("user", userSchema, "users");
