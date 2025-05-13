import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../../model/users.model";
import { notification } from "../../model/notification.model";
import { OTP } from "../../model/otpModel";

export const PostLoginUserController = async (req: Request, res: Response) => {
  const { email, password, otp } = req.body;

  if (!email || !password || !otp) {
    res.status(400).json({
      success: false,
      message: "Email, password, and OTP are required",
    });
    return;
  }

  try {
    // 1. Find OTP record for login purpose
    const otpRecord = await OTP.findOne({ email, purpose: "login" });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP verification required. Please request a new OTP",
      });
      return;
    }

    // 2. Verify OTP
    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOTP) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    // 3. Delete OTP after successful verification
    await OTP.deleteOne({ _id: otpRecord._id });

    // 4. Check user credentials
    const userFound = await Users.findOne({ email });
    if (!userFound) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // 5. Verify password
    const isMatch = await bcrypt.compare(
      password,
      userFound.password as string
    );
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    // 6. Create JWT Token
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      {
        userId: userFound._id,
        role: userFound.role,
        phoneNumber: userFound.phoneNumber,
        name: userFound.name,
        createdAt: userFound.createdAt,
        userEmail: userFound.email,
      },
      jwtSecret,
      { expiresIn: "2 days" }
    );

    // 7. Create notification
    await notification.create({
      title: "Хэрэглэгч амжилттай нэвтэрлээ",
      userId: userFound._id,
    });

    // 8. Respond with success
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
