import express, { Request, Response } from "express";
import usersRoutes from "../resources/users/routes/usersRoutes";
import testRoutes from "../resources/test/routes/testRoutes";
import { verifyToken } from "../middlewares/authenticate";
const router = express.Router();

// router.use(verifyToken)
router.use("/users", usersRoutes);
router.use("/testSecure", verifyToken, testRoutes);
router.use("/tests", testRoutes);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;