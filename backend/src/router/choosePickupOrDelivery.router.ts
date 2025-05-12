
import express from "express";
import { createChoosePickupOrDelivery } from "../controller/choosePickupOrDelivery/createChoosePickupOrDelivery";
import { checkChoosePickupOrDelivery } from "../controller/choosePickupOrDelivery/getPickupOrDelivery";


export const choosePickupOrDeliveryRoutes = express.Router();

choosePickupOrDeliveryRoutes.post("/:userId", createChoosePickupOrDelivery);
choosePickupOrDeliveryRoutes.get("/:userId", checkChoosePickupOrDelivery);

