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
const createDeliveryAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, district, khoroo, detail } = req.body;
    const userId = req.params.userId;
    if (!city || !district || !khoroo || !detail) {
        res.status(400).json({
            success: false,
            message: "Something is missing in body",
        });
        return;
    }
    try {
        const newAddress = yield deliveryAddress_model_1.deliveryAddress.create({
            city: city,
            district: district,
            khoroo: khoroo,
            detail: detail,
            userId: userId,
        });
        res.status(201).json({
            success: true,
            deliveryAddress: newAddress,
        });
        return;
    }
    catch (err) {
        console.error(err, "error while creating location");
        res.status(500).json({
            success: false,
        });
        return;
    }
});
exports.default = createDeliveryAddress;
