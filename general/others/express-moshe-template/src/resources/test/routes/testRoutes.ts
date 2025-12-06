import express, { Request, Response, NextFunction } from "express";
import { handleTest } from "../controllers/testControllers";

const router = express.Router();

router.get("/test", handleTest);

export default router;