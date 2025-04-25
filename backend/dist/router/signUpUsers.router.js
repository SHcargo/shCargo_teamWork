"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateUser_controller_1 = require("../controller/signUp/CreateUser.controller");
const validateEmailMiddleWares_1 = require("../middlewares/userCreateLogin/validateEmailMiddleWares");
const validatePasswordMiddleWares_1 = require("../middlewares/userCreateLogin/validatePasswordMiddleWares");
const validatePhoneNumberMiddleWares_1 = require("../middlewares/userCreateLogin/validatePhoneNumberMiddleWares");
exports.UserSignUpRouter = express_1.default.Router();
exports.UserSignUpRouter.post("/", validateEmailMiddleWares_1.validateEmail, validatePasswordMiddleWares_1.validatePassword, validatePhoneNumberMiddleWares_1.validatePhoneNumber, CreateUser_controller_1.CreateUserController);
