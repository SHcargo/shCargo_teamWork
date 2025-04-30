import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  detail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});

export const deliveryAddress = mongoose.model(
  "deliveryAddress",
  deliveryAddressSchema
);
