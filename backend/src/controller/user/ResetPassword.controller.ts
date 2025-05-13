import { Response, Request } from "express";
import { Users } from "../../model/users.model";
import bcrypt from "bcrypt";
import { notification } from "../../model/notification.model";
import { OTP } from "../../model/otpModel";

const ResetPassword = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { email, newPassword, otp } = req.body;

  if (!email || !newPassword || !otp) {
    res.status(400).json({
      success: false,
      message: "Email, password, and OTP are required",
    });
    return;
  }

  try {
    const otpRecord = await OTP.findOne({ email, purpose: "reset_password" });
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
