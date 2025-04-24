import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  district: { type: String, required: true },
  khoroo: { type: String, required: true },
  detail: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

export const deliveryAddress = mongoose.model(
  "deliveryAddress",
  deliveryAddressSchema
);
