import { Request, Response } from "express";
import { Users } from "../../model/users.model"; // Make sure the Users model is correctly imported

/**
 * Controller to fetch all users along with their associated truck code items (orders).
 */
export const GetUsersToAdmin = async (_req: Request, res: Response) => {
  try {
    // Fetch all users and populate the truckCodeItem with their associated item details
    const users = await Users.find({}).populate("truckCodeItem.item");

    // Check if no users are found
    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users found." });
      return;
    }

    // Respond with a success status and the users with their orders
    res.status(200).json({
      message: "Users fetched successfully.",
      users, // This includes the populated truckCodeItem
    });
  } catch (error) {
    // Log the error and return a server error response
    console.error("❌ Error fetching all users:", error);
    res.status(500).json({
      message: "Server error while fetching all users.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
