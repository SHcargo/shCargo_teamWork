import express from "express";
import { ItemsOrderController } from "../controller/orderitem/OrderItem.controller";
export const OrderItemRouter = express.Router();
OrderItemRouter.post("/", ItemsOrderController);
