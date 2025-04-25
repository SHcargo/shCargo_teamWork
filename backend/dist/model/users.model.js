"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, default: "irj awna" },
    deliveryAddresses: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "deliveryAddress",
        },
    ],
    truckCodeItem: [
        {
            item: { type: mongoose_1.default.Types.ObjectId, ref: "truckItems" },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true,
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
exports.Users = mongoose_1.default.model("users", usersSchema);
