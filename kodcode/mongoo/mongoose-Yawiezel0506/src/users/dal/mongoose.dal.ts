import { UserModel, IUser } from "../../mongoAccess/userModel";

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const users = await UserModel.find({}).exec();
    console.log("I work with mongoose to get the users");

    return users;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error(catchError.message);
  }
};

export const register = async (userData: IUser): Promise<IUser> => {
  console.log("Registering here I am");

  try {
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  userId: string,
  userData: IUser
): Promise<IUser | null> => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    }).exec();
    console.log("updated user", updatedUser);
    
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findById(userId).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (userId: string): Promise<IUser> => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId).exec();
    if (!deletedUser) throw new Error(`User ${userId} is not found`);
    return deletedUser;
  } catch (error) {
    console.log("dal");
    throw error;
  }
};
