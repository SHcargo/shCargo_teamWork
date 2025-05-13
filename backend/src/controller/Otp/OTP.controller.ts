import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { OTP } from "../../model/otpModel";
import { Users } from "../../model/users.model";
import { sendOtpEmail } from "../../middlewares/sendOtpEmail";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOTP = async (req: Request, res: Response) => {
  const { email, purpose } = req.body;

  if (!email || !purpose) {
    res
      .status(400)
      .json({ success: false, message: "Email and purpose are required" });
    return;
  }

  // Optionally validate user existence for certain purposes
  if (["login", "reset_password", "change_phone"].includes(purpose)) {
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
  }

  try {
    const otp = generateOTP();
    const hashedOTP = await bcrypt.hash(otp, 10);

    // Delete existing OTPs for same email and purpose
    await OTP.deleteMany({ email, purpose });

    // Save new OTP
    await OTP.create({ email, otp: hashedOTP, purpose });

    // Send OTP email
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) {
      res
        .status(500)
        .json({ success: false, message: "Failed to send OTP email" });
      return;
    }

    res.status(200).json({ success: true, message: "OTP sent successfully" });
    return;
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp, purpose } = req.body;

  if (!email || !otp || !purpose) {
    res
      .status(400)
      .json({ success: false, message: "Email, OTP and purpose are required" });
    return;
  }

  try {
    const otpRecord = await OTP.findOne({ email, purpose });
    if (!otpRecord) {
      res
        .status(400)
        .json({ success: false, message: "OTP expired or not found" });
      return;
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      res.status(400).json({ success: false, message: "Invalid OTP" });
      return;
    }

    // Mark OTP as verified or delete to prevent reuse
    await OTP.deleteOne({ _id: otpRecord._id });

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
    return;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
