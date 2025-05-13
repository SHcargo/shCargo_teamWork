import mongoose from "mongoose";

const salesProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, requied: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

export const SalesProduct = mongoose.model("sales", salesProductSchema);
