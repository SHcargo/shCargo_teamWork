import { Request, Response } from "express";
import { choosePickupOrDelivery } from "../../model/choosePickupOrDelivery";

// Create a new choosePickupOrDelivery only if one doesn't exist
export const createChoosePickupOrDelivery = async (
  req: Request,
  res: Response
) => {
  try {
    const { deliveryAddress, status, phoneNumber, trackingNumber } = req.body;
    const userId = req.params.userId;

    // Validate if required fields are provided
    if (!deliveryAddress || !status || !phoneNumber || !trackingNumber) {
       res.status(400).json({
        success: false,
        message: "Дутуу талбарууд байна.",
      });return
    }

    // Check if a record already exists for this user
    const existing = await choosePickupOrDelivery.findOne({ trackingNumber });

    if (existing) {
       res.status(400).json({
        success: false,
        message: "Хэрэглэгч аль хэдийн сонголт хийсэн байна.",
      });return
    }

    // Create a new choosePickupOrDelivery
    const newChoosePickupOrDelivery = new choosePickupOrDelivery({
      deliveryAddress,
      status,
      userId,
      phoneNumber,
      trackingNumber,
    });

    const saved = await newChoosePickupOrDelivery.save();

    res.status(201).json({
      success: true,
      message: "ChoosePickupOrDelivery created successfully",
      data: saved,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Error creating ChoosePickupOrDelivery",
    });
  }
};
