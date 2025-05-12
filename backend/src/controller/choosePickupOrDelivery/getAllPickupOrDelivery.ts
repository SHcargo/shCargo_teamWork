import { Request, Response } from "express";
import { choosePickupOrDelivery } from "../../model/choosePickupOrDelivery";

// Check if user has already chosen a pickup or delivery address
export const getAllChoosePickupOrDelivery = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await choosePickupOrDelivery.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching choosePickupOrDelivery data:", error);
    res.status(500).json({ message: "Серверийн алдаа" });
  }
};
