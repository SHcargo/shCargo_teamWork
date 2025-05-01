import express from "express";
import getNotification from "../controller/notification/getNotification.contoller";

export const NotificationRouter = express.Router();
NotificationRouter.get("/:userId", getNotification);
