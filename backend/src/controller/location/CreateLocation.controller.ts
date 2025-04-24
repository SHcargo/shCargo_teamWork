import { Request, Response } from "express";
import { Location } from "../../model/location.model";

export const CreateLocationController = async (req: Request, res: Response) => {
  const { userPhoneNumber, factoryPhoneNumber, region, location, zipCode } =
    req.body;

  if (
    !userPhoneNumber ||
    !factoryPhoneNumber ||
    !region ||
    !location ||
    !zipCode
  ) {
    res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
    return;
  }
  try {
    const CreateLocation = await Location.create({
      userPhoneNumber,
      factoryPhoneNumber,
      region,
      location,
      zipCode,
    });
    res.status(201).json({
      success: true,
      location: CreateLocation,
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
