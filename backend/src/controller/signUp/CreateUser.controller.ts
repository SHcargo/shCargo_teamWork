import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import bcrypt from "bcryptjs";
import { notification } from "../../model/notification.model";
import { OTP } from "../../model/otpModel";

export const CreateUserController = async (req: Request, res: Response) => {
  const { email, password, phoneNumber, name, otp } = req.body;

  if (!email || !password || !phoneNumber || !name || !otp) {
    res.status(400).json({
      success: false,
      message: "All fields including OTP are required",
    });
    return;
  }

  try {
    // Find OTP record for signup purpose
    const otpRecord = await OTP.findOne({ email, purpose: "signup" });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP verification required. Please request a new OTP",
      });
      return;
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOTP) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await Users.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User with this email or phone number already exists",
      });
      return;
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      phoneNumber,
      password: hashedPassword,
      name,
      isVerified: true,
    });

    await notification.create({
      userId: newUser._id,
      title: "Хэрэглэгч амжилттай бүртгэгдлээ",
    });

    // Delete OTP after successful registration
    await OTP.deleteOne({ email, purpose: "signup" });

    res.status(201).json({
      success: true,
      user: newUser,
    });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
