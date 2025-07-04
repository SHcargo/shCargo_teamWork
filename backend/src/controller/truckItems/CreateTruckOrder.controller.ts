import { ItemsOrder } from "../../model/truckOrders.model";
import { Users } from "../../model/users.model";
import { Request, Response } from "express";

export const TruckItemsController = async (req: Request, res: Response) => {
  const { userId, trackingNumber } = req.body;

  try {
    if (!userId) {
      res.status(400).json({ message: "userId is required." });
      return;
    }

    // Optional: get user's current orders
    const orders = await ItemsOrder.find({ userId });
    const track = await ItemsOrder.findOne({ trackingNumber });
    if (track) {
      res.status(409).json({
        message: "Хяналтын дугаар аль хэдийн байна.",
        existingItem: track,
      });
      return;
    }
    // Create a new order entry
    const newTrackItem = await ItemsOrder.create({
      userId,
      trackingNumber,
      status: "Бүртгэсэн",
      goodsItems: [
        {
          item: trackingNumber,
          quantity: 1,
        },
      ],
    });

    // Push the new item + quantity to the user
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        $push: {
          truckCodeItem: {
            item: newTrackItem._id,
            quantity: 1,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Tracking item added successfully.",
      newTrackItem,
      orders,
      updatedUser,
    });
    return;
  } catch (error) {
    console.error("❌ Error in TruckItemsController:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error instanceof Error ? error.message : error,
    });
    return;
  }
};
