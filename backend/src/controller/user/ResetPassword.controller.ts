import { Response, Request } from "express";
import { Users } from "../../model/users.model";
import bcrypt from "bcrypt";
import { notification } from "../../model/notification.model";

const ResetPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const userId = req.params.userId;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await Users.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    await notification.create({
      title: "Таны нууц үг амжилттай сэргэлээ",
      userId: user._id,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
    return;
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      success: false,
      message: "Error updating password",
      error,
    });
  }
};

export default ResetPassword;
