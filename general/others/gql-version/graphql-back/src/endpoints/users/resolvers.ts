import {
  UserLogin,
  UserRegister,
  UserRegisterInput,
} from "../../interfaces/users";
import { addToRedis, existsInRedis } from "../../utils/redis";
import usersServices from "./services";

export const UsersResolvers = {
  Query: {
    getAllUsers: async () => {
      const redisData = await existsInRedis("users");
      if (redisData != null) return redisData;
      const users = await usersServices.getAllUsers();
      if (!users) {
        throw new Error("Something went wrong!");
      }
      await addToRedis("users", users);
      return users;
    },
  },

  Mutation: {
    logIn: async (_: any, args: { user: UserLogin }) => {
      const body = args.user;
      const login = await usersServices.login(body);
      if (!login) {
        throw new Error("Something went wrong!");
      }
      return login;
    },

    register: async (_: any, args: { user: UserRegisterInput }) => {
      const register = await usersServices.register(args.user);
      console.log(register);

      if (typeof register === "string" || !register) {
        throw new Error("Something went wrong!");
      }
      return register;
    },

    edit: async (
      _: any,
      args: { oldUser: UserRegister; newUser: UserRegister }
    ) => {
      const oldAndNewUsers = [args.oldUser, args.newUser];
      const edit = await usersServices.edit(oldAndNewUsers);
      if (edit === "error") {
        throw new Error("user not found");
      }
      return edit; //// && edit.user;
    },
  },
};
