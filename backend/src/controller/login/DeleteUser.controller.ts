import { Request, Response } from "express";
import { Users } from "../../model/users.model";

export const DeleteLoginUserController = async (
  req: Request,
  res: Response
) => {
  const { _id } = req.query as { _id?: string };

  if (!_id) {
    res.status(400).json({
      success: false,
      message: "Missing user ID in query",
    });
    return;
  }

  try {
    const deleteResult = await Users.deleteOne({ _id });

    res.status(200).json({
      success: true,
      result: deleteResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error instanceof Error ? error.message : error,
    });
  }
};
