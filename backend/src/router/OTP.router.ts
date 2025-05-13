import express from "express";

import {
  SendSignupOTPController,
  VerifySignupOTPController,
  SendPasswordResetOTPController,
} from "../controller/Otp/signup/sendSignUpOtp";
import { SendLoginOTPController } from "../controller/Otp/login/sendLoginOtp.controller";
import { VerifyLoginOTPController } from "../controller/Otp/login/verifyLoginOTP.controller";

const otpRouter = express.Router();

// OTP routes
otpRouter.post("/send-signup-otp", SendSignupOTPController);
otpRouter.post("/verify-signup-otp", VerifySignupOTPController);
otpRouter.post("/send-reset-otp", SendPasswordResetOTPController);
otpRouter.post("/send-login-otp", SendLoginOTPController);
otpRouter.post("/verify-login-otp", VerifyLoginOTPController);

export default otpRouter;
