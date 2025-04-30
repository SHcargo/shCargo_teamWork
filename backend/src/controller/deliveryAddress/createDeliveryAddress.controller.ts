import { deliveryAddress } from "../../model/deliveryAddress.model";
import { Request, Response } from "express";
import { Users } from "../../model/users.model";

const createDeliveryAddress = async (req: Request, res: Response) => {
  const { lng, lat, detail } = req.body;
  const userId = req.params.userId;

  if (!lng || !lat || !detail) {
    res.status(400).json({
      success: false,
      message: "lat, lng or detail is missing",
    });
    return;
  }

  try {
    const newAddress = await deliveryAddress.create({
      userId,
      lat,
      lng,
      detail,
    });

    await Users.findByIdAndUpdate(userId, {
      $push: { deliveryAddresses: newAddress._id },
      $set: { primaryDeliveryAddress: newAddress._id },
    });

    res.status(201).json({
      success: true,
      deliveryAddress: newAddress,
    });
    return;
  } catch (err) {
    console.error("Error while creating location:", err);
    res.status(500).json({
      success: false,
      msg: "Server error while creating delivery address",
    });
    return;
  }
};

export default createDeliveryAddress;
