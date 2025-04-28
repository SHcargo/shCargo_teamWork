import express from "express";
import createPinPoint from "../controller/pinPointAddress/createPinPoint.controller";

export const PinPointAddressRouter = express.Router();
PinPointAddressRouter.post("/:userId", createPinPoint);
