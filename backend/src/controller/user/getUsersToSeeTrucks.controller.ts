import { Request, Response } from "express";
import { Users } from "../../model/users.model";

export const GetUsersToSeeTrucks = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const userWithOrders = await Users.findOne({ _id: userId }).populate(
      "truckCodeItem.item"
    );

    if (!userWithOrders) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(200).json(userWithOrders);
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user orders." });
  }
};
