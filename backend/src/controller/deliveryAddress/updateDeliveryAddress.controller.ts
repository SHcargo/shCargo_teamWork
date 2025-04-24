import { deliveryAddress } from "../../model/deliveryAddress.model";
import { Request, Response } from "express";
export const updateDeliveryAddress = async (req: Request, res: Response) => {
  const { userId, addressId } = req.params;
  const { city, district, khoroo, detail } = req.body;

  try {
    const updated = await deliveryAddress.findOneAndUpdate(
      { _id: addressId, userId },
      { city, district, khoroo, detail }
    );

    if (!updated) {
      res.status(404).json({ message: "Address not found." });
      return;
    }

    res.status(200).json(updated);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to update address.", error });
    return;
  }
};
