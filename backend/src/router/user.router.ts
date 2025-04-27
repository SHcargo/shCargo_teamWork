import express from "express";
import updateUser from "../controller/user/updateUser.controller";
import { GetUsersToSeeTrucks } from "../controller/user/getUsersToSeeTrucks.controller";
export const UserRouter = express.Router();

UserRouter.put("/:userId", updateUser);
UserRouter.get("/", GetUsersToSeeTrucks);
