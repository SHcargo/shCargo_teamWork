import { Request, Response, NextFunction } from "express";

export const validatePhoneNumber = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phoneNumber } = req.body;

  if (typeof phoneNumber !== "string" || !/^\d{8}$/.test(phoneNumber)) {
    res.status(400).json({
      success: false,
      message: "phoneNumber must be a string of exactly 8 digits",
    });
    return;
  }

  next();
};
