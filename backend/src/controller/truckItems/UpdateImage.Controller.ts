import { ItemsOrder } from "../../model/truckOrders.model";
import { Request, Response } from "express";

export const UpdateImageController = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;
  const { image } = req.body;

  try {
    const findTruck = await ItemsOrder.findOne({ trackingNumber });

    if (!findTruck) {
      res.status(404).json({ message: "Truck not found" });
      return;
    }

    const updatedTruck = await ItemsOrder.updateOne(
      { trackingNumber },
      { $set: { image } }
    );

    // Check if the update was successful
    if (updatedTruck.modifiedCount > 0) {
      res.status(200).json({ message: "Image updated successfully" });
      return;
    } else {
      res.status(400).json({ message: "Failed to update image" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again later" });
    return;
  }
};
