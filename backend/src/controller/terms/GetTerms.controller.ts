import { Request, Response } from "express";
import { Terms } from "../../model/terms.model";
export const GetTermsAndCondition = async (req: Request, res: Response) => {
  try {
    const getTerms = await Terms.find({});
    res.status(201).json({
      success: true,
      message: getTerms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};
