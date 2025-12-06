import express from "express";
import authController from "./authController.js";

const router = express.Router();

router.post("/", authController.createOrGetUser)

export default router;
