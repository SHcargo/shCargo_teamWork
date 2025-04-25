"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsOrder = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const STATUS = ["Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];
const itemsOrderSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
    goodsItems: [
        {
            item: { type: String, require: false },
            quantity: { type: Number, required: true, min: 1 },
            image: { type: String, require: false },
            price: { type: Number, require: false },
        },
    ],
    status: {
        type: String,
        enum: STATUS,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    statusHistory: [
        {
            status: {
                type: String,
                enum: STATUS,
            },
            changedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});
// Pre-save hook to track status changes and timestamps
itemsOrderSchema.pre("save", function (next) {
    if (this.isModified("status")) {
        const now = new Date();
        // // Update the corresponding timestamp
        // if (this.status === "PENDING") {
        //   this.pendingAt = now;
        // } else if (this.status === "CANCELLED") {
        //   this.cancelledAt = now;
        // } else if (this.status === "DELIVERED") {
        //   this.deliveredAt = now;
        // }
        // Add to status history
        this.statusHistory.push({
            status: this.status,
            changedAt: now,
        });
    }
    next();
});
exports.ItemsOrder = mongoose_1.default.model("itemsOrder", itemsOrderSchema);
