import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import { ItemsOrder } from "../../model/truckOrders.model";

export const create = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const { trackingNumber } = req.params;

    // Input validation
    if (!phoneNumber) {
       res.status(400).json({ message: "Phone number is required" });
       return
    }

    if (!trackingNumber) {
       res.status(400).json({ message: "Truck number is required" });
       return
    }

    // Find the user by phone number
    const user = await Users.findOne({ phoneNumber }).populate({
      path: "truckCodeItem.item",
      select: "trackingNumber status",
    });

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return
    }

    // Check if truck number already exists for this user
    const hasTruckNumber = user.truckCodeItem.some((entry) => 
      entry.item?.trackingNumber === trackingNumber
    );

    if (hasTruckNumber) {
       res.status(409).json({ message: "Truck number already exists for this user" });
       return
    }

    // Create a new tracking item
    const newTrackItem = await ItemsOrder.create({
      userId: user._id,
      trackingNumber: trackingNumber,
      status: "Замдаа", // Initial status
      goodsItems: [
        {
          item: trackingNumber,
          quantity: 1,
        },
      ],
    });

    // Update user with the new tracking item
    await Users.findByIdAndUpdate(user._id, {
      $push: {
        truckCodeItem: {
          item: newTrackItem._id,
          quantity: 1,
        },
      },
    });

    // Return success response
     res.status(201).json({
      message: "Tracking item created successfully",
      trackingItem: {
        id: newTrackItem._id,
        trackingNumber: trackingNumber,
        status: "Замдаа"
      }
    });return
    
  } catch (err) {
    console.error("❌ Error in create controller:", err);
     res.status(500).json({
      message: "Internal server error",
      error: err instanceof Error ? err.message : String(err)
    });return
  }
};