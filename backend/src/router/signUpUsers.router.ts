import express from "express";
import { CreateUserController } from "../controller/signUp/CreateUser.controller";
import { validateEmail } from "../middlewares/userCreateLogin/validateEmailMiddleWares";
import { validatePassword } from "../middlewares/userCreateLogin/validatePasswordMiddleWares";
export const UserSignUpRouter = express.Router();
UserSignUpRouter.post(
  "/",
  validateEmail,
  validatePassword,
  CreateUserController
);
