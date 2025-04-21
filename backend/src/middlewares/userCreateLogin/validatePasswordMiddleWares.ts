import { Request, Response, NextFunction } from "express";
export const validatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;

  if (password && password.length >= 8) {
    next();
  } else {
    res
      .status(400)
      .json({
        success: false,
        message: "Password must be 8 or more characters",
      })
      .send();
  }
};
