import { deliveryAddress } from "../../model/deliveryAddress.model";
import { Request, Response } from "express";

const createDeliveryAddress = async (req: Request, res: Response) => {
  const { city, district, khoroo, detail } = req.body;
  const userId = req.params.userId;

  if (!city || !district || !khoroo || !detail) {
    res.status(400).json({
      success: false,
      message: "Something is missing in body",
    });
    return;
  }

  try {
    const newAddress = await deliveryAddress.create({
      city: city,
      district: district,
      khoroo: khoroo,
      detail: detail,
      userId: userId,
    });
    res.status(201).json({
      success: true,
      deliveryAddress: newAddress,
    });
    return;
  } catch (err) {
    console.error(err, "error while creating location");
    res.status(500).json({
      success: false,
    });
    return;
  }
};

export default createDeliveryAddress;
