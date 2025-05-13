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
      message: "All fields are required",
    });
    return;
  }

  try {
    // Check if OTP is verified
    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP verification required. Please request a new OTP",
      });
      return;
    }

    // Verify OTP
    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);

    if (!isValidOTP || !otpRecord.isVerified) {
      res.status(400).json({
        success: false,
        message: "Invalid or unverified OTP",
      });
      return;
    }

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await Users.create({
      email,
      phoneNumber,
      password: hashedPassword,
      name,
      isVerified: true, // User is verified because OTP was verified
    });

    await notification.create({
      userId: createUser._id,
      title: `Хэрэглэгч амжилттай бүртгэгдлээ`,
    });

    // Delete the OTP record after successful registration
    await OTP.deleteOne({ email });

    res.status(201).json({
      success: true,
      user: createUser,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
