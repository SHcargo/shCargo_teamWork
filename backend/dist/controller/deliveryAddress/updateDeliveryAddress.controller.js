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
exports.updateDeliveryAddress = void 0;
const deliveryAddress_model_1 = require("../../model/deliveryAddress.model");
const updateDeliveryAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, addressId } = req.params;
    const { city, district, khoroo, detail } = req.body;
    try {
        const updated = yield deliveryAddress_model_1.deliveryAddress.findOneAndUpdate({ _id: addressId, userId }, { city, district, khoroo, detail });
        if (!updated) {
            res.status(404).json({ message: "Address not found." });
            return;
        }
        res.status(200).json(updated);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update address.", error });
        return;
    }
});
exports.updateDeliveryAddress = updateDeliveryAddress;
