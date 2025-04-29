import express from "express";
import { TruckItemsController } from "../controller/truckItems/CreateTruckOrder.controller";
import { GetTruckItemsController } from "../controller/truckItems/GetTruckItems.controller";
import { GetUserSelectOneOrderItems } from "../controller/truckItems/GetUserSelectOneOrderItems.controller";
import { updateOrderStatus } from "../controller/truckItems/UpdateTruckOrder.controller";
export const TruckOrdersRouter = express.Router();

TruckOrdersRouter.post("/", TruckItemsController);
TruckOrdersRouter.get("/:userId", GetTruckItemsController)
TruckOrdersRouter.get("/:userId/:id", GetUserSelectOneOrderItems)
TruckOrdersRouter.put('/scan/:trackingNumber', updateOrderStatus);