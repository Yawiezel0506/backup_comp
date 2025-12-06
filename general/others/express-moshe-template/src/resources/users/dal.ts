import { handleDBResponseError } from "../../utils/handleErrors";
import { UserInterface, UserLoginInterface } from "./interfaces/UserInterface";

type CollectionResult = Promise<Record<string, unknown>[] | Error>;

export const createUser = async (userData: UserInterface) => {
  try {
    // TODO: implement create user and return it
    throw new Error("implement create user and return it")
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUsers = async (): CollectionResult => {
  try {
    // TODO: implement readUsers and return it
    throw new Error("implement readUsers and return it")
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUserById = async (id: UserInterface['id']) => {
  try {
    
    // TODO: implement readUserById and return it
    throw new Error("implement readUserById and return it")
  } catch (error) {
    return handleDBResponseError(error);
  }
};

export const readUserByEmail = async (email: UserLoginInterface['email']) => {
  try {
    // const user = await UserModel.findOne({ email: email });
    // if (!user) throw new Error('User Not Found!');
    // return user;
    // TODO: implement readUserByEmail and return it
    throw new Error("implement readUserByEmail and return it")
  } catch (error) {
    return handleDBResponseError(error);
  }
};
