import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Users } from "../model/users.model";

export const precheckLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    res
      .status(404)
      .json({ success: false, message: "Хэрэглэгч бүртгэлгүй байна" });
    return;
  }

  if (!user.password) {
    res
      .status(500)
      .json({ success: false, message: "Хэрэглэгчийн нууц үг олдсонгүй" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password as string);

  if (!valid) {
    res.status(401).json({ success: false, message: "Нууц үг буруу байна" });
    return;
  }

  res.json({ success: true });
};
