"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../../model/users.model");
const updateUser = (req, res) => {
    const { name, phoneNumber } = req.body;
    const userId = req.params.userId;
    try {
        const updateUser = users_model_1.Users.findByIdAndUpdate(userId, {
            name,
            phoneNumber,
        });
        res.status(201).json({
            success: true,
            msg: "successfuly updated user",
            updatedUser: updateUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};
exports.default = updateUser;
