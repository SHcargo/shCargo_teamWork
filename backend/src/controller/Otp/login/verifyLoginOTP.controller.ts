import { Request, Response } from "express";
import { OTP } from "../../../model/otpModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const VerifyLoginOTPController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
    return;
  }

  try {
    // Find the OTP record
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP expired or not found",
      });
      return;
    }

    // Compare the OTP
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }
    // Mark OTP as verified
    await OTP.updateOne({ email }, { $set: { isVerified: true } });

    // Generate token and respond
    const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
    });

    return;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

    return;
  }
};
