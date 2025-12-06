import express from "express";
import {
  handleGetUser,
  handleGetUsers,
  handleUserRegistration,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
  handleAddProductToUser,
} from "../controllers/usersControllers";

const router = express.Router();

router.get("/", handleGetUsers);
router.get("/:id", handleGetUser);
router.post("/", handleUserRegistration);
router.put("/:id", handleEditUser);
router.delete("/:id", handleDeleteUser);
router.post("/login", handleLogin);
router.post("/add-product/:id", handleAddProductToUser);

export default router;
