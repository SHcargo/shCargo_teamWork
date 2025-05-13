import { Request, Response } from "express";
import { OTP } from "../../../model/otpModel";
import { Users } from "../../../model/users.model";
import { sendOtpEmail } from "../../../middlewares/sendOtpEmail";
import bcrypt from "bcryptjs";

// Generate a random 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for signup
export const SendSignupOTPController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email is required",
    });
    return;
  }

  try {
    // Check if email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already registered",
      });
      return;
    }

    // Generate OTP
    const otp = generateOTP();

    // Hash the OTP before storing
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

// Verify OTP for signup
export const VerifySignupOTPController = async (
  req: Request,
  res: Response
) => {
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
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    // Mark OTP as verified
    otpRecord.isVerified = true;
    await otpRecord.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
    return;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Send OTP for password reset
export const SendPasswordResetOTPController = async (
  req: Request,
  res: Response
) => {
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

    // Hash the OTP before storing
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
  }
};
