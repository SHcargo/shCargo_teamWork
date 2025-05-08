import { deliveryAddress } from "../../model/deliveryAddress.model";
import { Request, Response } from "express";
import { Users } from "../../model/users.model";
import { notification } from "../../model/notification.model";

const createDeliveryAddress = async (req: Request, res: Response) => {
  const { lng, lat, detail, district, khoroo, accuracy } = req.body;
  const userId = req.params.userId;

  if (!lng || !lat || !detail || !district || !khoroo) {
    res.status(400).json({
      success: false,
      message: "request body's missing",
    });
    return;
  }

  try {
    const newAddress = await deliveryAddress.create({
      userId,
      lat,
      lng,
      detail,
      district,
      khoroo,
      accuracy,
    });

    await Users.findByIdAndUpdate(userId, {
      $push: { deliveryAddresses: newAddress._id },
      $set: { primaryDeliveryAddress: newAddress._id },
    });

    await notification.create({
      title: "Шинэ хаяг амжилттай бүртгэгдлээ",
      userId: userId,
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
