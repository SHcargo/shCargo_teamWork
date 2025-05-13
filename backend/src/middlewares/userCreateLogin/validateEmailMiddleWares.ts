import { Request, Response, NextFunction } from "express";
import { Users } from "../../model/users.model";

export const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    email.match(validRegex) &&
    email.includes(".com") &&
    email.includes("gmail")
  ) {
    const userEmail = await Users.findOne({
      email: email,
    });
    if (userEmail) {
      res
        .status(400)
        .json({
          success: false,
          message: "Энэ и-мэйл хаягтай хэрэглэгч бүртгэлтэй байна",
        })
        .send();
    } else {
      next();
    }
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "Email format required",
      })
      .send();
  }
};
