"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckOrdersRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateTruckOrder_controller_1 = require("../controller/truckItems/CreateTruckOrder.controller");
exports.TruckOrdersRouter = express_1.default.Router();
exports.TruckOrdersRouter.post("/", CreateTruckOrder_controller_1.TruckItemsController);
