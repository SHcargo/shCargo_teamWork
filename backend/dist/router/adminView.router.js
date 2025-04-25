"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminViewRouter = void 0;
const express_1 = __importDefault(require("express"));
const GetUsersToAdmin_controller_1 = require("../controller/admin/GetUsersToAdmin.controller");
const PostUsersToAdmin_controller_1 = require("../controller/admin/PostUsersToAdmin.controller");
exports.AdminViewRouter = express_1.default.Router();
exports.AdminViewRouter.get("/", GetUsersToAdmin_controller_1.GetUsersToAdmin);
exports.AdminViewRouter.post("/", PostUsersToAdmin_controller_1.PostUsersToAdmin);
