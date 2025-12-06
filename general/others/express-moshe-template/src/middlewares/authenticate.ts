import express, { NextFunction, Request, Response } from "express";
import { Request as ExpressRequest } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends ExpressRequest {
  user?: any;
}


export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  if(!process.env.JWT_SECRET_TOKEN) throw new Error('JWT_SECRET_TOKEN not found!');

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};
