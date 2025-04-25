"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryAddressRouter = void 0;
const express_1 = __importDefault(require("express"));
const createDeliveryAddress_controller_1 = __importDefault(require("../controller/deliveryAddress/createDeliveryAddress.controller"));
const getDeliveryAddress_controller_1 = __importDefault(require("../controller/deliveryAddress/getDeliveryAddress.controller"));
const updateDeliveryAddress_controller_1 = require("../controller/deliveryAddress/updateDeliveryAddress.controller");
const deleteDeliveryAddress_controller_1 = require("../controller/deliveryAddress/deleteDeliveryAddress.controller");
exports.DeliveryAddressRouter = express_1.default.Router();
exports.DeliveryAddressRouter.get("/:userId", getDeliveryAddress_controller_1.default);
exports.DeliveryAddressRouter.post("/:userId", createDeliveryAddress_controller_1.default);
exports.DeliveryAddressRouter.put("/:userId/:addressId", updateDeliveryAddress_controller_1.updateDeliveryAddress);
exports.DeliveryAddressRouter.delete("/:userId/:addressId", deleteDeliveryAddress_controller_1.deleteDeliveryAddress);
