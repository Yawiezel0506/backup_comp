import { IUser } from "../mongoAccess/userModel";
import UserInterface from "../users/interfaces/UserInterface";
import { getUsers } from "../users/services/usersApiService";
import { register } from "../users/dal/mongoose.dal";
import chalk from "chalk";

const data = {
  users: [
    { email: "regular@gmail.com", password: "Aa1234!" },
    { email: "business@gmail.com", password: "Aa1234!" },
    { email: "admin@gmail.com", password: "Aa1234!" },
  ],
};

export const generateInitialUsers = async () => {
  try {
    const usersInDB = await getUsers();
    if (Array.isArray(usersInDB) && usersInDB.length > 0) return null;

    const users: IUser[] = [];

    for (const user of data.users) {
      const userType = user as unknown as IUser
      try {
        const userInDB = await register(userType);
        users.push(userInDB as IUser);
      } catch (error) {
        console.log(chalk.redBright("Could not register this user"));
      }
    }

    Promise.resolve(users);
  } catch (error) {
    console.log(chalk.redBright(error));
    Promise.reject(error);
  }
};
