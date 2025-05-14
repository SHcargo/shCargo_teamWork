import { Request, Response } from "express";
import { Users } from "../../model/users.model";

const FindUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const userExist = await Users.findOne({ email: email });
    if (!userExist) {
      res.status(404).json({ message: "User not found.", success: false });
      return;
    }

    res.status(200).json({
      message: "User with this email exist",
      success: true,
      user: userExist,
    });
  } catch (error) {
    console.error("Error founding user by phone number", error);
    res
      .status(500)
      .json({ message: "Server error while founding user by phone number." });
  }
};

export default FindUserByEmail;
