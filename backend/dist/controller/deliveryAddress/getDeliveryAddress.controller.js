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
const deliveryAddress_model_1 = require("../../model/deliveryAddress.model");
const getDeliveryAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const addresses = yield deliveryAddress_model_1.deliveryAddress.find({ userId: userId });
        if (!addresses.length) {
            res.status(404).json({
                success: false,
                message: "No delivery addresses found for this user",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Successfully retrieved delivery addresses",
            data: addresses,
        });
        return;
    }
    catch (err) {
        console.error("Error fetching delivery addresses:", err);
        res.status(500).json({
            success: false,
            message: "Server error while retrieving delivery addresses",
        });
        return;
    }
});
exports.default = getDeliveryAddress;
