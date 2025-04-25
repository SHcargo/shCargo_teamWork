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
exports.DeleteLoginUserController = void 0;
const users_model_1 = require("../../model/users.model");
const DeleteLoginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    if (!_id) {
        res.status(400).json({
            success: false,
            message: "Missing user ID in query",
        });
        return;
    }
    try {
        const deleteResult = yield users_model_1.Users.deleteOne({ _id });
        res.status(200).json({
            success: true,
            result: deleteResult,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while deleting user",
            error: error instanceof Error ? error.message : error,
        });
    }
});
exports.DeleteLoginUserController = DeleteLoginUserController;
