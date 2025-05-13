import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserSignUpRouter } from "./router/signUpUsers.router";
import { UserLoginRouter } from "./router/loginUsers.router";
import { AdminViewRouter } from "./router/adminView.router";
import { LocationRouter } from "./router/location.router";
import { TruckOrdersRouter } from "./router/truckOrder.router";
import { DeliveryAddressRouter } from "./router/deliveryAddress.router";
import { UserRouter } from "./router/user.router";
import { SalesProductRouter } from "./router/salesProduct.router";
import { TermsRouter } from "./router/terms.router";
import { NotificationRouter } from "./router/notification.router";
import { choosePickupOrDeliveryRoutes } from "./router/choosePickupOrDelivery.router";
import otpRouter from "./router/OTP.router";

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const connectDb = () => {
  try {
    const connectDb = mongoose.connect(
      process.env.DATABASE_MONGODB_URL as string
    );
    console.log("connection success");
  } catch (error) {
    console.log("error connecting to db:", error);
  }
};
connectDb();

app.use("/signUp", UserSignUpRouter);
app.use("/terms", TermsRouter);
app.use("/login", UserLoginRouter);
app.use("/truckItems", TruckOrdersRouter);
app.use("/adminView", AdminViewRouter);
app.use("/location", LocationRouter);
app.use("/deliveryAddress", DeliveryAddressRouter);
app.use("/user", UserRouter);
app.use("/sales", SalesProductRouter);
app.use("/notification", NotificationRouter);
app.use("/choosePickupOrDelivery", choosePickupOrDeliveryRoutes);
app.use("/otp", otpRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
