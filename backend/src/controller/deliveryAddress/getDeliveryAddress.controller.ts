import { Request, Response } from "express";
import { deliveryAddress } from "../../model/deliveryAddress.model";
const getDeliveryAddress = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const addresses = await deliveryAddress.find({ userId: userId });

    if (!addresses.length) {
      res.status(404).json({
        success: false,
        message: "No delivery addresses found for this user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully retrieved delivery addresses",
      data: addresses,
    });
    return;
  } catch (err) {
    console.error("Error fetching delivery addresses:", err);
    res.status(500).json({
      success: false,
      message: "Server error while retrieving delivery addresses",
    });
    return;
  }
};

export default getDeliveryAddress;
