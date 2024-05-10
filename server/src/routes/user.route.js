import express from "express";
import {
  changeRole,
  deleteUser,
  general,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";
import { checkUserById } from "../middlewares/user.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const userRoute = express.Router();

userRoute.get("/general", verifyToken, general);
userRoute.get("/users", getAllUsers);
userRoute.get("/users/:id", checkUserById, getUserById);
userRoute.patch("/users/update/role/:id", changeRole);
userRoute.delete("/users/delete/:id", deleteUser);

export default userRoute;
