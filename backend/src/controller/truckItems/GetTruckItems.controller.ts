
import { ItemsOrder } from "../../model/truckOrders.model";
import { Request, Response } from "express";

export const GetTruckItemsController = async (req: Request, res: Response) => {
  const { userId } = req.params; 

  try {
    if (!userId) {
      res.status(400).json({ message: "userId is required." });
      return;
    }

    const orders = await ItemsOrder.find({userId});


    res.status(200).json({
      message: "Truck orders retrieved successfully.",
      orders,
    });
  } catch (error) {
    console.error("Error in GetTruckItemsController:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error instanceof Error ? error.message : error,
    });
  }
};
