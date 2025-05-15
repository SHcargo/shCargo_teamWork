import { Request, Response } from "express";
import { help } from "../../model/help.model";

const CreateHelpCenterController = async (req: Request, res: Response) => {
  const { salbar, detail, dugaar, workinHours, weekend, image } = req.body;

  // Basic validation (optional but recommended)
  if (!salbar || !detail || !dugaar || !workinHours || !weekend) {
    res.status(400).json({
      success: false,
      msg: "Please provide all required fields",
    });
    return;
  }

  try {
    const createHelp = await help.create({
      salbar,
      detail,
      dugaar,
      workinHours,
      weekend,
      image, // optional, can be empty or undefined
    });

    res.status(201).json({
      success: true,
      location: createHelp,
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

export default CreateHelpCenterController;
