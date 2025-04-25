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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = void 0;
const users_model_1 = require("../../model/users.model");
const validateEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex) &&
        email.includes(".com") &&
        email.includes("gmail")) {
        const userEmail = yield users_model_1.Users.findOne({
            email: email,
        });
        if (userEmail) {
            res
                .status(400)
                .json({
                success: false,
                message: "Found user with this email",
            })
                .send();
        }
        else {
            next();
        }
    }
    else {
        res
            .status(400)
            .json({
            success: false,
            message: "Email format required",
        })
            .send();
    }
});
exports.validateEmail = validateEmail;
