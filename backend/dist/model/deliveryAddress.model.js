"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryAddress = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const deliveryAddressSchema = new mongoose_1.default.Schema({
    city: { type: String, required: true },
    district: { type: String, required: true },
    khoroo: { type: String, required: true },
    detail: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    userId: { type: String, required: true },
});
exports.deliveryAddress = mongoose_1.default.model("deliveryAddress", deliveryAddressSchema);
