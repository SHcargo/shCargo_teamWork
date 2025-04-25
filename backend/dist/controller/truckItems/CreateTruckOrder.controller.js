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
exports.TruckItemsController = void 0;
const truckOrders_model_1 = require("../../model/truckOrders.model");
const users_model_1 = require("../../model/users.model");
const TruckItemsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, trackingNumber } = req.body;
    try {
        if (!userId) {
            res.status(400).json({ message: "userId is required." });
            return;
        }
        const orders = yield truckOrders_model_1.ItemsOrder.find({ userId });
        const newTrackItem = yield truckOrders_model_1.ItemsOrder.create({
            userId,
            trackingNumber,
            status: "Бүртгэсэн",
            goodsItems: [
                {
                    item: trackingNumber,
                    quantity: 1,
                },
            ],
        });
        const updatedUser = yield users_model_1.Users.findByIdAndUpdate(userId, {
            $push: {
                truckCodeItem: {
                    item: newTrackItem._id,
                    quantity: 1,
                },
            },
        }, { new: true });
        res.status(200).json({
            message: "Tracking item added successfully.",
            newTrackItem,
            orders,
            updatedUser,
        });
        return;
    }
    catch (error) {
        console.error("Error in TruckItemsController:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: error instanceof Error ? error.message : error,
        });
        return;
    }
});
exports.TruckItemsController = TruckItemsController;
