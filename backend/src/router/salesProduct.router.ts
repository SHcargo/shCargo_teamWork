import express from "express";
import { CreateSalesController } from "../controller/sales/createSales.controller";
import { GetAllSalesProductController } from "../controller/sales/getSales.controller";

export const SalesProductRouter = express.Router();
SalesProductRouter.get("/", GetAllSalesProductController);
SalesProductRouter.post("/", CreateSalesController);
