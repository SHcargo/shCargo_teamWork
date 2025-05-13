import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { OTP } from "../../../model/otpModel";
import { Users } from "../../../model/users.model";
import { sendOtpEmail } from "../../../middlewares/sendOtpEmail";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const SendLoginOTPController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email is required",
    });
    return;
  }

  try {
    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash the OTP before storing it
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Save OTP to database (delete previous ones first)
    await OTP.deleteMany({ email });
    await OTP.create({
      email,
      otp: hashedOTP,
    });

    // Send OTP via email
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
      res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
    return;
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
