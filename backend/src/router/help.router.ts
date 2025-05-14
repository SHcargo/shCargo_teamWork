import express from "express";
import CreateHelpCenterController from "../controller/help/CreateHelpCenterController";

export const HelpRouter = express.Router();
HelpRouter.post("/salbar", CreateHelpCenterController);
