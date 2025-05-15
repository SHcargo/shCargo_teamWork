import express from "express";
import CreateHelpCenterController from "../controller/help/CreateHelpCenterController";
import GetHelpCenterController from "../controller/help/GetHelp.controller";

export const HelpRouter = express.Router();
HelpRouter.post("/salbar", CreateHelpCenterController);
HelpRouter.delete("/salbar");
HelpRouter.put("/salbar");
HelpRouter.get("/salbar", GetHelpCenterController);
