import { Request, Response } from "express";
import { Users } from "../../model/users.model";

export const GetUsersToAdmin = async (req: Request, res: Response) => {
  try {
    const usersOrders = await Users.find(); // fetch all orders
    res.status(200).json(usersOrders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user orders." });
  }
};
