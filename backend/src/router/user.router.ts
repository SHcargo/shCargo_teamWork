import express from "express";
import { GetUsersToSeeTrucks } from "../controller/user/getUsersToSeeTrucks.controller";
import updateUserPhoneNumber from "../controller/user/updateUserPhoneNumber.controller";
import updateUserPassword from "../controller/user/updateUserPassword.controller";
import ResetPasswordController from "../controller/user/FindUserByEmail.controller";
import FindUserByPhoneNumber from "../controller/user/FindUserByEmail.controller";
import ResetPassword from "../controller/user/ResetPassword.controller";
export const UserRouter = express.Router();

UserRouter.put("/updatePhoneNumber/:userId", updateUserPhoneNumber);
UserRouter.put("/updatePassword/:userId", updateUserPassword);
UserRouter.get("/", GetUsersToSeeTrucks);
UserRouter.post("/findByEmail", FindUserByPhoneNumber);
UserRouter.put("/resetPassword/:userId", ResetPassword);
