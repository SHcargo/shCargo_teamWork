import { Request, Response } from "express";
import { choosePickupOrDelivery } from "../../model/choosePickupOrDelivery";

// Check if user has already chosen a pickup or delivery address
export const checkChoosePickupOrDelivery = async (req: Request, res: Response) => {
  try {
    const trackingNumber = req.params.userId;

    // Check if a document exists for the user
    const existing = await choosePickupOrDelivery.findOne({ trackingNumber });

    if (existing) {
       res.status(200).json({
        success: false,
        message: "Энэ хэрэглэгч аль хэдийн хаяг сонгосон байна.",
      });
      return
    }

     res.status(200).json({
      success: true,
      message: "Хэрэглэгч хаяг сонгоогүй байна.",
    });
    return
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Алдаа гарлаа.",
    });
  }
};
