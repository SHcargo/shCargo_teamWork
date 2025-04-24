import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
  province: { type: String, required: true },
  district: { type: String, required: true },
  subdistrict: { type: String, required: true },
  detailed: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const deliveryAddress = mongoose.model(
  "deliveryAddress",
  deliveryAddressSchema
);
