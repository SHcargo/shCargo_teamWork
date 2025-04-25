"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const DeleteUser_controller_1 = require("../controller/login/DeleteUser.controller");
const PostLoginUser_controller_1 = require("../controller/login/PostLoginUser.controller");
exports.UserLoginRouter = express_1.default.Router();
exports.UserLoginRouter.post("/", PostLoginUser_controller_1.PostLoginUserController);
exports.UserLoginRouter.delete("/", DeleteUser_controller_1.DeleteLoginUserController);
