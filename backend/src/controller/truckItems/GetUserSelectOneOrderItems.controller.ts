import { ItemsOrder } from "../../model/truckOrders.model";
import { Request, Response } from "express";

export const GetUserSelectOneOrderItems = async (req: Request, res: Response) => {
  const { userId, id } = req.params;

  try {
    if (!userId || !id) {
      res.status(400).json({ message: "userId and id are required." });
      return;
    }

    const order = await ItemsOrder.findOne({ userId, _id: id });

    if (!order) {
      res.status(404).json({ message: "Order not found." });
      return;
    }

    res.status(200).json({
      message: "Order retrieved successfully.",
      order,
    });
  } catch (error) {
    console.error("Error in GetUserSelectOneOrderItems:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error instanceof Error ? error.message : error,
    });
  }
};