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
exports.PostUsersToAdmin = void 0;
const truckOrders_model_1 = require("../../model/truckOrders.model");
const PostUsersToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, goodsItems, deliveryAddress, status, statusHistory } = req.body;
    try {
        // Create a new order document
        const newOrder = yield truckOrders_model_1.ItemsOrder.create({
            user,
            goodsItems,
            deliveryAddress,
            status,
            statusHistory,
        });
        res.status(201).json({
            message: "Order successfully created.",
            data: newOrder,
        });
    }
    catch (error) {
        console.error("Error in PostUsersToAdmin:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
exports.PostUsersToAdmin = PostUsersToAdmin;
