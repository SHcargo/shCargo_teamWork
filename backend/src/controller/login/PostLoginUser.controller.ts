import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "../../model/users.model";
import { notification } from "../../model/notification.model";

export const PostLoginUserController = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    res.status(400).json({
      success: false,
      message: "Phone number and password are required",
    });
    return;
  }

  try {
    const userFound = await Users.findOne({ phoneNumber });

    if (!userFound) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

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

    const decodePassword = "123";

    const token = jwt.sign(
      {
        userId: userFound?._id,
        role: userFound?.role,
        phoneNumber: userFound?.phoneNumber,
        name: userFound?.name,
        createdAt: userFound?.createdAt,
      },
      decodePassword,
      { expiresIn: "2 days" }
    );
    await notification.create({
      title: "Хэрэглэгч амжилттай нэвтэрлээ",
      userId: userFound._id,
    });

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
  }
};
