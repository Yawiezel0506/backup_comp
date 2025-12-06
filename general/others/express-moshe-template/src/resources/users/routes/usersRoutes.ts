import express, { Request, Response, NextFunction } from "express";
import { handleLogout, handleUserLogin, handleUserRegistration } from "../controllers/usersControllers";

const router = express.Router();

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegistration);
router.post("/logout", handleLogout)

export default router;