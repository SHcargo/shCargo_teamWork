import express from "express";
import { GetUsersToAdmin } from "../controller/admin/GetUsersToAdmin.controller";
export const AdminViewRouter = express.Router();
AdminViewRouter.get("/", GetUsersToAdmin);
