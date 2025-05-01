import { Request, Response } from "express";
import { notification } from "../../model/notification.model";
const getNotification = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const notifications = await notification.find({ userId: userId });

    if (notifications.length === 0) {
      res.status(404).json({
        success: false,
        message: "There is no notification for this user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched user's notification",
      data: notifications,
    });
    return;
  } catch (err) {
    console.error("Error fetching user's notification :", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user's notifcation",
    });
    return;
  }
};

export default getNotification;
