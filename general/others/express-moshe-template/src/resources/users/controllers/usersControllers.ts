import { register, loginService } from "../services/usersService";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import { UserInterface, UserLoginInterface } from "../interfaces/UserInterface";
import { handleError } from "../../../utils/handleErrors";

export const handleUserLogin = async (req: Request, res: Response) => {
  try {
    const userFromBody = req.body as UserLoginInterface;
    const loginResponse = await loginService(userFromBody);
    res.cookie('token', loginResponse?.token, { httpOnly: true, secure: true, sameSite: 'strict' });
    return res.send(loginResponse);
  } catch (error) {
    handleError(res, error);
  }
};

export const handleLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user = req.body as UserInterface;
    console.log(user);
    
    const newUserRecord = await register(user);
    return res.status(201).send(newUserRecord);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};