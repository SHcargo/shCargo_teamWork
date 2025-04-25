"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const users_model_1 = require("../../model/users.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const CreateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, phoneNumber, name } = req.body;
    if (!email || !password || !phoneNumber) {
        res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
        return;
    }
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const createUser = yield users_model_1.Users.create({
            email,
            phoneNumber,
            password: hashedPassword,
            name,
        });
        res.status(201).json({
            success: true,
            user: createUser,
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
        return;
    }
});
exports.CreateUserController = CreateUserController;
