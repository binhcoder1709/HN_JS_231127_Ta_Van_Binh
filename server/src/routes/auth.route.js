import express from "express";
import { addUser, loginUser } from "../controllers/auth.controller.js";
import {
  accessToken,
  checkBlockedUser,
  checkEmptyUser,
  checkExist,
  decryptionPassword,
  hashPassword,
  validationUser,
} from "../middlewares/auth.middleware.js";
const authRoute = express.Router();

authRoute.post(
  "/auth/register",
  validationUser,
  checkEmptyUser,
  hashPassword,
  addUser
);

authRoute.post(
  "/auth/login",
  checkExist,
  decryptionPassword,
  checkBlockedUser,
  accessToken,
  loginUser
);

export default authRoute;
