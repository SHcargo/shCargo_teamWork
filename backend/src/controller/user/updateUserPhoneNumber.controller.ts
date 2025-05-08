import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import jwt from "jsonwebtoken";
import { notification } from "../../model/notification.model";

const updateUserPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const userId = req.params.userId;

  try {
    const existingUser = await Users.findOne({
      phoneNumber,
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "Phone number already exist",
      });
      return;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { phoneNumber },
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
    res.status(500).json({
      success: false,
      message: "Error updating user's phone number",
      error,
    });
  }
};

export default updateUserPhoneNumber;
