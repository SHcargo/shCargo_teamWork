"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const locationSchema = new mongoose_1.default.Schema({
    userPhoneNumber: { type: Number, required: true },
    factoryPhoneNumber: { type: Number, required: true },
    region: { type: String, required: true },
    location: { type: String, required: true },
    zipCode: { type: Number, required: true },
});
exports.Location = mongoose_1.default.model("location", locationSchema);
