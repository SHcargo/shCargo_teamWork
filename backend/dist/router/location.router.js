"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateLocation_controller_1 = require("../controller/location/CreateLocation.controller");
const GetLocation_controller_1 = require("../controller/location/GetLocation.controller");
const PutLocation_controller_1 = require("../controller/location/PutLocation.controller");
exports.LocationRouter = express_1.default.Router();
exports.LocationRouter.post("/", CreateLocation_controller_1.CreateLocationController);
exports.LocationRouter.get("/", GetLocation_controller_1.GetLocationController);
exports.LocationRouter.put("/", PutLocation_controller_1.PutLocationController);
