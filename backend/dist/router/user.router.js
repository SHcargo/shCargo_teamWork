"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const updateUser_controller_1 = __importDefault(require("../controller/user/updateUser.controller"));
exports.UserRouter = express_1.default.Router();
exports.UserRouter.put("/:userId", updateUser_controller_1.default);
