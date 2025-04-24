import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  userPhoneNumber: { type: Number, required: true },
  factoryPhoneNumber: { type: Number, required: true },
  region: { type: String, required: true },
  location: { type: String, required: true },
  zipCode: { type: Number, required: true },
});
export const Location = mongoose.model("location", locationSchema);
