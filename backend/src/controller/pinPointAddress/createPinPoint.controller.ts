// routes/location.js
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
const createPinPoint = async (req: Request, res: Response) => {
  const { latitude, longitude, detail } = req.body;
  const userId = req.params.userId;

  try {
    if (!latitude || !longitude) {
      res.status(400).json({
        success: false,
        message: "Something is missing in body",
      });
      return;
    }

    const newPinPoint = await PinPointAddress.create({
      userId: userId,
      latitude: latitude,
      longitude: longitude,
      detail: detail,
    });

    res.status(201).json({
      success: true,
      deliveryAddress: newPinPoint,
    });
    return;
  } catch (error) {
    console.error("Error saving location:", error);
    res.status(500).json({ message: "Error saving location" });
    return;
  }
};

export default createPinPoint;
