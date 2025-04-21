import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import bcrypt from "bcryptjs";

export const CreateUserController = async (req: Request, res: Response) => {
  const { email, password, phoneNumber } = req.body;

  if (!email || !password || !phoneNumber) {
    res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await Users.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });
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
