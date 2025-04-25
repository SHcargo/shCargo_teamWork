"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = void 0;
const validatePhoneNumber = (req, res, next) => {
    const { phoneNumber } = req.body;
    if (typeof phoneNumber !== "string" || !/^\d{8}$/.test(phoneNumber)) {
        res.status(400).json({
            success: false,
            message: "phoneNumber must be a string of exactly 8 digits",
        });
        return;
    }
    next();
};
exports.validatePhoneNumber = validatePhoneNumber;
