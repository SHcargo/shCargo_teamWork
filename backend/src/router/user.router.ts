import express from "express";
import updateUser from "../controller/user/updateUser.controller";
export const UserRouter = express.Router();

UserRouter.put("/:userId", updateUser);
