import { ItemsOrder } from "../../model/truckOrders.model";
import { Request, Response } from "express";

export const UpdateImageController = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;
  const { image } = req.body;

  if (!image) {
     res.status(400).json({ message: "Image is required" });
     return
  }

  try {
    const updatedTruck = await ItemsOrder.findOneAndUpdate(
      { trackingNumber },
      { $set: { image } },
      { new: true } 
    );

    if (!updatedTruck) {
       res.status(404).json({ message: "Truck not found" });
       return
    }

     res.status(200).json({ message: "Image updated successfully", truck: updatedTruck });
     return
  } catch (error) {
    console.error("Error updating truck image:", error);
     res.status(500).json({ message: "Server error, please try again later" });
     return
  }
};

