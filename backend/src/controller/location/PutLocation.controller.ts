import { Request, Response } from "express";
import { Location } from "../../model/location.model";
export const PutLocationController = async (req: Request, res: Response) => {
  const { userPhoneNumber, factoryPhoneNumber, region, location, zipCode } =
    req.body;

  try {
    const updateLoc = await Location.updateOne({
      userPhoneNumber,
      factoryPhoneNumber,
      region,
      location,
      zipCode,
    });
    res.status(200).json({
      success: true,
      location: updateLoc,
    });
    return;
  } catch (err) {
    console.error(err, "error while updating location");
    res.status(500).json({
      success: false,
    });
    return;
  }
};
