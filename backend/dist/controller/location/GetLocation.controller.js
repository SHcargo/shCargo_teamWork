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
exports.GetLocationController = void 0;
const location_model_1 = require("../../model/location.model");
const GetLocationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getLocation = yield location_model_1.Location.find();
        res.status(200).json({
            success: true,
            location: getLocation,
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
exports.GetLocationController = GetLocationController;
