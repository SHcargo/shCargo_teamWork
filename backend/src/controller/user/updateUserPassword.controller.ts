import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { notification } from "../../model/notification.model";

const updateUserPassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
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

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user?.password as string
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await Users.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: updatedUser?._id,
        phoneNumber: updatedUser?.phoneNumber,
        role: updatedUser?.role,
        name: updatedUser?.name,
        createdAt: updatedUser?.createdAt,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    await notification.create({
      title: "Таны нууц үг амжилттай шинэчлэгдлээ",
      userId: user._id,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      token,
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

export default updateUserPassword;

// import { Request, Response } from "express";
// import { Users } from "../../model/users.model";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { notification } from "../../model/notification.model";
// import { OTP } from "../../model/otpModel";
// const updateUserPassword = async (req: Request, res: Response) => {
//   const { currentPassword, newPassword, otp } = req.body;
//   const userId = req.params.userId;

//   if (!currentPassword || !newPassword || !otp) {
//     res.status(400).json({
//       success: false,
//       message: "Current password, new password, and OTP are required",
//     });
//     return;
//   }

//   try {
//     const user = await Users.findById(userId);
//     if (!user) {
//       res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//       return;
//     }

//     // Verify OTP with purpose 'change_password'
//     const otpRecord = await OTP.findOne({
//       email: user.email,
//       purpose: "change_password",
//     });
//     if (!otpRecord) {
//       res.status(400).json({
//         success: false,
//         message: "OTP verification required. Please request a new OTP",
//       });
//       return;
//     }

//     const isValidOTP = await bcrypt.compare(otp, otpRecord.otp);
//     if (!isValidOTP) {
//       res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//       return;
//     }

//     // Delete OTP after verification
//     await OTP.deleteOne({ _id: otpRecord._id });

//     // Verify current password
//     const isPasswordValid = await bcrypt.compare(
//       currentPassword,
//       user.password as string
//     );
//     if (!isPasswordValid) {
//       res.status(401).json({
//         success: false,
//         message: "Current password is incorrect",
//       });
//       return;
//     }

//     // Hash new password and update
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     const updatedUser = await Users.findByIdAndUpdate(
//       userId,
//       { password: hashedPassword },
//       { new: true }
//     );

//     // Generate new JWT token
//     const token = jwt.sign(
//       {
//         userId: updatedUser?._id,
//         phoneNumber: updatedUser?.phoneNumber,
//         role: updatedUser?.role,
//         name: updatedUser?.name,
//         createdAt: updatedUser?.createdAt,
//         email: updatedUser?.email,
//       },
//       process.env.JWT_SECRET || "your-secret-key",
//       { expiresIn: "7d" }
//     );

//     // Create notification
//     await notification.create({
//       title: "Таны нууц үг амжилттай шинэчлэгдлээ",
//       userId: user._id,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Password updated successfully",
//       token,
//     });
//     return;
//   } catch (error) {
//     console.error("Error updating password:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error updating password",
//       error,
//     });
//     return;
//   }
// };

// export default updateUserPassword;
