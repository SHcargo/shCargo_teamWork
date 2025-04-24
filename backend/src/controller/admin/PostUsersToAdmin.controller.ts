import { Request, Response } from "express";
import { ItemsOrder } from "../../model/truckOrders.model";

export const PostUsersToAdmin = async (req: Request, res: Response) => {
  const { user, goodsItems, deliveryAddress, status, statusHistory } = req.body;

  try {
    // Create a new order document
    const newOrder = await ItemsOrder.create({
      user,
      goodsItems,
      deliveryAddress,
      status,
      statusHistory,
    });

    res.status(201).json({
      message: "Order successfully created.",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error in PostUsersToAdmin:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
