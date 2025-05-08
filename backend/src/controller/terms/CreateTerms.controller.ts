import { Request, Response } from "express";
import { Terms } from "../../model/terms.model";

export const CreateTermsAndCondition = async (req: Request, res: Response) => {
  const {
    registration,
    condition,
    price,
    payment,
    shipping,
    deliver,
    deliverPrice,
    forbidden,
    responsibility,
    loss,
  } = req.body;

  try {
    const createTerms = await Terms.create({
      registration,
      condition,
      price,
      payment,
      shipping,
      deliver,
      deliverPrice,
      forbidden,
      responsibility,
      loss,
    });

    res.status(201).json({
      success: true,
      terms: createTerms,
    });
  } catch (error) {
    console.log("Error creating terms:", error); // ✅ Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
