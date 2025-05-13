import express from "express";
import { sendOTP } from "../controller/Otp/OTP.controller";
import { verifyOTP } from "../controller/Otp/OTP.controller";

const otpRouter = express.Router();

otpRouter.post("/send", sendOTP);
otpRouter.post("/verify", verifyOTP);

export default otpRouter;
