import { Request, Response } from "express";
import { help } from "../../model/help.model";
const GetHelpCenterController = async (req: Request, res: Response) => {
  try {
    const getHelp = await help.find({});
    res.status(201).json({
      success: true,
      deliveryAddress: getHelp,
    });
    return;
  } catch (error) {
    console.error("Error while creating location:", error);
    res.status(500).json({
      success: false,
      msg: "Server error while creating delivery address",
    });
    return;
  }
};
export default GetHelpCenterController;
