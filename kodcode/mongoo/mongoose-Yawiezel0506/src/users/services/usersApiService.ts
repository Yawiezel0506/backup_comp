import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import {
  getCollectionFromJsonFile,
  modifyCollection,
} from "../../dataAccess/jsonfileDAL";
import chalk from "chalk";
import userValidation from "../models/joi/userValidation";
import { getDataFromDummy } from "../../dataAccess/dummyjson";
import { addDataToJsonPlaceHolder } from "../../dataAccess/jsonPlaceHolder";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  register as registration,
  updateUser,
} from "../dal/mongoose.dal";
import { IUser } from "../../mongoAccess/userModel";

type UserResult = Promise<IUser | null>;

export const getUsers = async () => {
  try {
    const users = await getAllUsers();
    if (!users) throw new Error("no users in the database");
    return users;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    if (user instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    return user;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const register = async (user: IUser): UserResult => {
  try {
    const users = await getAllUsers();
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const userRegistered = users.find((u) => u.email === user.email);
    if (userRegistered) throw new Error("This user is already registered!");

    user.password = generateUserPassword(user.password);
    const savedUser = await registration(user);
    return savedUser;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const editUser = async (
  userId: string,
  userForUpdate: IUser
): UserResult => {
  try {
    const updatedUser = await updateUser(userId, userForUpdate);
    if (!updatedUser) throw new Error("Oops... Could not update");
    return updatedUser;
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const deletedUserReturn = await deleteUserById(userId);
    if (!deletedUserReturn) throw new Error("Oops... Could not delete");
    return deletedUserReturn;
  } catch (error) {
    console.log("service");

    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: IUser) => {
  try {
    const users = (await getAllUsers()) as unknown as IUser[];
    if (!users)
      throw new Error("Oops... Could not get the users from the Database");

    const userInDB = users.find((user) => userFromClient.email === user.email);

    console.log(userInDB);

    if (!userInDB) throw new Error("The email or password is incorrect!");

    if (!comparePassword(userFromClient.password, userInDB.password))
      throw new Error("The email or password is incorrect!");

    return "You are logged in!";
  } catch (error) {
    console.log("service");

    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};

export const addProductToUser = async (
  userId: string,
  productFromClient: string
) => {
  try {
    const user = await getUserById(userId);
    if (!user) throw new Error("Could not find this user!");

    console.log(user);
    

    const data = await getDataFromDummy();
    if (!data?.data) throw new Error("Could not get the data!");
    const { data: dataFromDummy } = data;

    const productFromDB = dataFromDummy.products.find(
      (product: Record<string, unknown>) =>
        typeof product.title === "string" &&
        product.title
          .toLowerCase()
          .trim()
          .includes(productFromClient.toLowerCase().trim())
    );

    if (!productFromDB) throw new Error("Could not found this product");

    console.log(productFromDB);
    console.log(user)
    
    user["product"] = productFromDB

    console.log(user);
    console.log(user.product);
    

    // const updatedUser = user.save()
    

    const updatedUser = await updateUser(userId, user)
    if (!updatedUser)
      throw new Error("Could not add this user database");

    console.log(updatedUser);
    

    return updatedUser;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error)
      console.log(chalk.redBright(error.message));
    return Promise.reject(error);
  }
};
