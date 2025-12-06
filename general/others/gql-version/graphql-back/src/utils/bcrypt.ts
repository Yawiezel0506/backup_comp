import { hashSync, compareSync } from "bcrypt";


export const generateUserPassword = (password: string) => hashSync(password, 10);

export const comparePassword = (
  passwordFromClient: string,
  passwordFromDB: string
) => compareSync(passwordFromClient, passwordFromDB);
