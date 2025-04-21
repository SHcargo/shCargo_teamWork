import express from "express";
import { DeleteLoginUserController } from "../controller/login/DeleteUser.controller";
import { PostLoginUserController } from "../controller/login/PostLoginUser.controller";
export const UserLoginRouter = express.Router();
UserLoginRouter.post("/", PostLoginUserController);
UserLoginRouter.delete("/", DeleteLoginUserController);
