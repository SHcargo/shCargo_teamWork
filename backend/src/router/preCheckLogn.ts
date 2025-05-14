import express from "express";
import { precheckLogin } from "../middlewares/preCheckLogin";

const preCheckRouter = express.Router();

preCheckRouter.post("/precheck", precheckLogin);

export default preCheckRouter;
