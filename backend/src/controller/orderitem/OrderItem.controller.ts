import { Request, Response } from "express";
import { OrderItem } from "../../model/orderItems.model";
import { ItemsOrder } from "../../model/truckOrders.model";

export const ItemsOrderController = async (req: Request, res: Response) => {
  const { userId, trackingNumber, orderId } = req.body;

  try {
    if (!userId) {
      res.status(400).json({ message: "userId is required." });
      return;
    }

    // If only userId is provided, fetch user's items
    if (userId && !trackingNumber) {
      const userItems = await OrderItem.find({ userId });

      if (!userItems.length) {
        res.status(404).json({ message: "No truck items found." });
        return;
      }

      res.status(200).json({
        message: "Truck items retrieved successfully.",
        data: userItems,
      });
      return;
    }

    // If creating new order item
    if (!trackingNumber || !orderId) {
      res.status(400).json({
        message: "trackingNumber and orderId are required to create item.",
      });
      return;
    }

    const newItem = await OrderItem.create({ userId, trackingNumber });

    await ItemsOrder.findByIdAndUpdate(
      orderId,
      {
        $push: {
          goodsItems: {
            item: newItem._id,
            quantity: 1,
          },
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Truck item created and added to order successfully.",
      data: newItem,
    });
    return;
  } catch (error) {
    console.error("Error in ItemsOrderController:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
