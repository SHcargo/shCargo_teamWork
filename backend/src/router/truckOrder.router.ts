import express from "express";
import { TruckItemsController } from "../controller/truckItems/CreateTruckOrder.controller";
import { GetTruckItemsController } from "../controller/truckItems/GetTruckItems.controller";
import { GetUserSelectOneOrderItems } from "../controller/truckItems/GetUserSelectOneOrderItems.controller";
import { updateOrderStatus } from "../controller/truckItems/UpdateTruckOrder.controller";
import { create } from "../controller/truckItems/createDeliveryCargo";
import { UpdateImageController } from "../controller/truckItems/UpdateImage.Controller";
import { DeleteTruckByTrackingNumber } from "../controller/deliveryAddress/DeleteTruckByTrackingNumber.controller";
export const TruckOrdersRouter = express.Router();

TruckOrdersRouter.post("/", TruckItemsController);
TruckOrdersRouter.get("/:userId", GetTruckItemsController);
TruckOrdersRouter.get("/:userId/:id", GetUserSelectOneOrderItems);
TruckOrdersRouter.put("/scan/:trackingNumber", updateOrderStatus);
TruckOrdersRouter.put("image/:trackingNumber", UpdateImageController);
TruckOrdersRouter.post("/scan/:trackingNumber", create);
TruckOrdersRouter.delete("/:trackingNumber", DeleteTruckByTrackingNumber);
