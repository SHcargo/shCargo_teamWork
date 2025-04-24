import { Location } from "../../model/location.model";
import { Request, Response } from "express";

export const GetLocationController = async (req: Request, res: Response) => {
  try {
    const getLocation = await Location.find();
    res.status(200).json({
      success: true,
      location: getLocation,
    });
    return;
  } catch (err) {
    console.error(err, "error while creating location");
    res.status(500).json({
      success: false,
    });
    return;
  }
};
