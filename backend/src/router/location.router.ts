import express from "express";
import { CreateLocationController } from "../controller/location/CreateLocation.controller";
import { GetLocationController } from "../controller/location/GetLocation.controller";
import { PutLocationController } from "../controller/location/PutLocation.controller";

export const LocationRouter = express.Router();
LocationRouter.post("/", CreateLocationController);
LocationRouter.get("/", GetLocationController);
LocationRouter.put("/", PutLocationController);
