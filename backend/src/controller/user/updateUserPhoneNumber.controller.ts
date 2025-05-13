import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import jwt from "jsonwebtoken";
import { notification } from "../../model/notification.model";
import { OTP } from "../../model/otpModel";
import bcrypt from "bcrypt";

const updateUserPhoneNumber = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { email, phoneNumber, otp } = req.body; // use phoneNumber here

  if (!email || !phoneNumber || !otp) {
    res.status(400).json({
      success: false,
      message: "Email, phone number, and OTP are required",
    });
    return;
  }

  try {
    const otpRecord = await OTP.findOne({ email, purpose: "change_phone" });
    if (!otpRecord) {
      res.status(400).json({
        success: false,
        message: "OTP verification required. Please request a new OTP",
      });
      return;
    }

    const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOTP) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    await OTP.deleteOne({ _id: otpRecord._id });

    const existingUser = await Users.findOne({ phoneNumber }); // check phoneNumber

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Phone number already exists",
      });
      return;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { phoneNumber }, // update phoneNumber field
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: updatedUser._id,
        phoneNumber: updatedUser.phoneNumber,
        role: updatedUser.role,
        name: updatedUser.name,
        createdAt: updatedUser.createdAt,
        userEmail: updatedUser.email, // <-- add this line
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    await notification.create({
      title: "Таны утасны дугаар амжилттай шинэчлэгдлээ",
      userId: userId,
    });

    res.status(200).json({
      success: true,
      message: "Successfully updated user's phone number",
      updatedUser,
      token,
    });
    return;
  } catch (error) {
    console.error("Error updating user's phone number", error);
    res.status(500).json({
      success: false,
      message: "Error updating user's phone number",
      error,
    });
    return;
  }
};

export default updateUserPhoneNumber;
