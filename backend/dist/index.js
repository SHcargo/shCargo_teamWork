"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const signUpUsers_router_1 = require("./router/signUpUsers.router");
const loginUsers_router_1 = require("./router/loginUsers.router");
const adminView_router_1 = require("./router/adminView.router");
const location_router_1 = require("./router/location.router");
const truckOrder_router_1 = require("./router/truckOrder.router");
const deliveryAddress_router_1 = require("./router/deliveryAddress.router");
const user_router_1 = require("./router/user.router");
require("dotenv").config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const connectDb = () => {
    try {
        const connectDb = mongoose_1.default.connect(process.env.DATABASE_MONGODB_URL);
        console.log("connection success");
    }
    catch (error) {
        console.log("error connecting to db:", error);
    }
};
connectDb();
app.use("/signUp", signUpUsers_router_1.UserSignUpRouter);
app.use("/login", loginUsers_router_1.UserLoginRouter);
app.use("/truckItems", truckOrder_router_1.TruckOrdersRouter);
app.use("/adminView", adminView_router_1.AdminViewRouter);
app.use("/location", location_router_1.LocationRouter);
app.use("/deliveryAddress", deliveryAddress_router_1.DeliveryAddressRouter);
app.use("user", user_router_1.UserRouter);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
exports.default = app;
