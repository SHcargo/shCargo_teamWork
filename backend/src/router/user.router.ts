import express from "express";
import { GetUsersToSeeTrucks } from "../controller/user/getUsersToSeeTrucks.controller";
import updateUserPhoneNumber from "../controller/user/updateUserPhoneNumber.controller";
import updateUserPassword from "../controller/user/updateUserPassword.controller";
export const UserRouter = express.Router();

UserRouter.put("/updatePhoneNumber/:userId", updateUserPhoneNumber);
UserRouter.put("/updatePassword/:userId", updateUserPassword);
UserRouter.get("/", GetUsersToSeeTrucks);
