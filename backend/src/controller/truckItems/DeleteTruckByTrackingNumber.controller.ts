import { ItemsOrder } from "../../model/truckOrders.model";
import { Request, Response } from "express";

export const DeleteTruckByTrackingNumber = async (req: Request, res: Response) => {
  const { trackingNumber } = req.params;

  try {
    const deletedTruck = await ItemsOrder.findOneAndDelete({ trackingNumber });

    if (!deletedTruck) {
       res.status(404).json({ message: "Truck not found" });
       return
    }

     res.status(200).json({ message: "Truck deleted successfully" });
     return
  } catch (error) {
    console.error("Delete error:", error);
     res.status(500).json({ message: "Server error, please try again later" });
     return
  }
};
