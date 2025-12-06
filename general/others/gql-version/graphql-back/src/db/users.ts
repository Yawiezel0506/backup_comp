import mongoose from "mongoose";
import { UserRegister } from "../interfaces/users";

interface UserDocument extends UserRegister, Document {}

const UserRegisterSchema = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserRegisterModel = mongoose.model<UserDocument>(
  "User",
  UserRegisterSchema
);

export const getUsers = () => UserRegisterModel.find({});
export const getUserByEmail = (email: string) =>
  UserRegisterModel.findOne({ email });
export const getUserByPassword = (password: string) =>
  UserRegisterModel.findOne({ password });
export const getUserById = (id: string) => UserRegisterModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserRegisterModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserRegisterModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserRegisterModel.findByIdAndUpdate(id, values);
