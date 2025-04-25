import { Request, Response } from "express";
import { Users } from "../../model/users.model";

const updateUser = (req: Request, res: Response) => {
  const { name, phoneNumber } = req.body;
  const userId = req.params.userId;

  try {
    const updateUser = Users.findByIdAndUpdate(userId, {
      name,
      phoneNumber,
    });
    res.status(201).json({
      success: true,
      msg: "successfuly updated user",
      updatedUser: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export default updateUser;
