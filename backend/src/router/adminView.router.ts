import express from "express";
import { GetUsersToAdmin } from "../controller/admin/GetUsersToAdmin.controller";
import { PostUsersToAdmin } from "../controller/admin/PostUsersToAdmin.controller";
export const AdminViewRouter = express.Router();
AdminViewRouter.get("/", GetUsersToAdmin);
AdminViewRouter.post("/", PostUsersToAdmin);
