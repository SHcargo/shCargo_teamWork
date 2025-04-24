import { Request, Response } from "express";
import { ItemsOrder } from "../../model/truckOrders.model";

export const GetUsersToAdmin = async (req: Request, res: Response) => {
  //   const { _id } = req.body;
  try {
    const usersOrders = await ItemsOrder.find(); // fetch all orders
    res.status(200).json(usersOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user orders." });
  }
};
