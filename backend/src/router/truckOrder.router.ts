import express from "express";
import { TruckItemsController } from "../controller/truckItems/CreateTruckOrder.controller";
export const TruckOrdersRouter = express.Router();
TruckOrdersRouter.post("/", TruckItemsController);
