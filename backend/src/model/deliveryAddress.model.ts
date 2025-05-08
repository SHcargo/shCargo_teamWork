import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number },
  detail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
  district: { type: String },
  khoroo: { type: String },
  accuracy: { type: Number },
});

export const deliveryAddress = mongoose.model(
  "deliveryAddress",
  deliveryAddressSchema
);
