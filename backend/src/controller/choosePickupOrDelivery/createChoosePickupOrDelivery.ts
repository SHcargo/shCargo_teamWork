import { Request, Response } from "express";
import { choosePickupOrDelivery } from "../../model/choosePickupOrDelivery";
import { ItemsOrder } from "../../model/truckOrders.model"; 

export const createChoosePickupOrDelivery = async (
  req: Request,
  res: Response
) => {
  try {
    const { deliveryAddress, status, phoneNumber, trackingNumber } = req.body;
    const userId = req.params.userId;


    const existing = await choosePickupOrDelivery.findOne({ trackingNumber });

    if (existing) {
       res.status(400).json({
        success: false,
        message: "Хэрэглэгч аль хэдийн сонголт хийсэн байна.",
      });return
    }

    const newChoose = new choosePickupOrDelivery({
      deliveryAddress,
      status,
      userId,
      phoneNumber,
      trackingNumber,
    });

    const saved = await newChoose.save();

    const updateResult = await ItemsOrder.updateOne(
      { trackingNumber },
      { $set: { delivery: status } }
    );

    if (updateResult.modifiedCount === 0) {
       res.status(404).json({
        success: false,
        message: "Tracking дугаартай захиалга олдсонгүй.",
      });
      return
    }

     res.status(201).json({
      success: true,
      message: "ChoosePickupOrDelivery амжилттай хадгалагдлаа.",
      data: saved,
    });return
  } catch (error) {
    console.error(error);
     res.status(500).json({
      success: false,
      message: "Сонголт хадгалах үед алдаа гарлаа.",
    });return
  }
};
