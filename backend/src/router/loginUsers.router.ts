import express from "express";
import { CreateUserController } from "../controller/signUp/CreateUser.controller";
export const UserRouter = express.Router();
UserRouter.post("/", CreateUserController);
