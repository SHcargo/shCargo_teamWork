import { deliveryAddress } from "../../model/deliveryAddress.model";
import { Request, Response } from "express";
export const deleteDeliveryAddress = async (req: Request, res: Response) => {
  const { userId, addressId } = req.params;

  try {
    const deleted = await deliveryAddress.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!deleted) {
      res.status(404).json({ message: "Address not found." });
      return;
    }

    res.status(200).json(deleted);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete address.", error });
    return;
  }
};
