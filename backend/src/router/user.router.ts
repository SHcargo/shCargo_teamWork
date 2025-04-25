import express from "express";
import updateUser from "../controller/user/updateUser";

export const UserRouter = express.Router();

UserRouter.put("/:userId", updateUser);
