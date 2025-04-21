import express from "express";
import { DeleteLoginUserController } from "../controller/login/DeleteUser.controller";
export const UserLoginRouter = express.Router();
UserLoginRouter.delete("/", DeleteLoginUserController);
