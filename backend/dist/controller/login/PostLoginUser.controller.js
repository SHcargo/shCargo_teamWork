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
exports.PostLoginUserController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = require("../../model/users.model");
const PostLoginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
        res.status(400).json({
            success: false,
            message: "Phone number and password are required",
        });
        return;
    }
    try {
        const userFound = yield users_model_1.Users.findOne({ phoneNumber });
        if (!userFound) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, userFound.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
            return;
        }
        const decodePassword = "123";
        const token = jsonwebtoken_1.default.sign({
            userId: userFound === null || userFound === void 0 ? void 0 : userFound._id,
            role: userFound === null || userFound === void 0 ? void 0 : userFound.role,
            phoneNumber: userFound === null || userFound === void 0 ? void 0 : userFound.phoneNumber,
            name: userFound === null || userFound === void 0 ? void 0 : userFound.name,
        }, decodePassword, { expiresIn: "2 days" });
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token: token,
        });
        return;
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.PostLoginUserController = PostLoginUserController;
