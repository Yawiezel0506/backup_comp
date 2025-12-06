import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import { createUser, readUserByEmail, readUserById, readUsers } from "../dal";
import chalk from "chalk";
import userValidation from "../models/joi/userValidation";
import { UserInterface, UserLoginInterface, UserLoginResponseInterface } from "../interfaces/UserInterface";
import jwt from 'jsonwebtoken';
import { hash } from "bcryptjs";


type UserLoginResult = Promise<UserLoginResponseInterface | null>;

export const loginService = async (user: UserLoginInterface): UserLoginResult => {
  try {
    const userByEmailFromDB = await readUserByEmail(user.email) as UserInterface;
    if (comparePassword(user.password, userByEmailFromDB.password)) {

      if(!process.env.JWT_SECRET_TOKEN) throw new Error('JWT_SECRET_TOKEN not found!');

      const jwtPayload = {
        id: userByEmailFromDB.id,
        role: userByEmailFromDB.role,
      }
      const userAccessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_TOKEN);

      const userLoginRes: UserLoginResponseInterface = {
        id: userByEmailFromDB.id,
        role: userByEmailFromDB.role,
        token: userAccessToken
      }
      return Promise.resolve(userLoginRes)
    }
    else {
      return Promise.reject(new Error("Bad Authentication"));
    }
  } catch (error) {
    console.log(chalk.redBright(error));
    return Promise.reject(error);
  }
};


export const register = async (user: UserInterface): UserLoginResult => {
  try {
    user.password = await hash(user.password, 10)
    return await createUser(user);
  } catch (error) {
    console.log(chalk.redBright(error));
    console.log((error));
    return Promise.reject(error);
  }
};

