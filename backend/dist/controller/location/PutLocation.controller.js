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
exports.PutLocationController = void 0;
const location_model_1 = require("../../model/location.model");
const PutLocationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userPhoneNumber, factoryPhoneNumber, region, location, zipCode } = req.body;
    try {
        const updateLoc = yield location_model_1.Location.updateOne({
            userPhoneNumber,
            factoryPhoneNumber,
            region,
            location,
            zipCode,
        });
        res.status(200).json({
            success: true,
            location: updateLoc,
        });
        return;
    }
    catch (err) {
        console.error(err, "error while updating location");
        res.status(500).json({
            success: false,
        });
        return;
    }
});
exports.PutLocationController = PutLocationController;
