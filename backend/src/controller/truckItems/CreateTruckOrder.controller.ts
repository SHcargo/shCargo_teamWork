import { Request, Response } from "express";
import { ItemsOrder } from "../../model/truckOrders.model";
import { Users } from "../../model/users.model";

export const TruckItemsController = async (req: Request, res: Response) => {
  const { _id, userId } = req.body;

  try {
    if (!_id || !userId) {
      res
        .status(400)
        .json({ message: "_id, userId, and trackingNumber are required." });
      return;
    }
    const order = await ItemsOrder.findById(_id).populate("goodsItems.item");

    if (!order) {
      res.status(404).json({ message: "Order not found." });
      return;
    }
    const trackItem = await ItemsOrder.create({ userId });
    await Users.findByIdAndUpdate(
      userId,
      { $push: { truckCodeItem: trackItem._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Order fetched and tracking item added successfully.",
      order,
      trackItem,
    });
    return;
  } catch (error) {
    console.error("Error in TruckItemsController:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
};
