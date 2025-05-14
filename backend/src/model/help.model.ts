import mongoose from "mongoose";
const helpSchema = new mongoose.Schema({
  salbar: { type: String, required: false },
  detail: { type: String, require: false },
  dugaar: { type: String, require: false },
  workinHours: { type: String, require: false },
  weekend: { type: String, require: false },
  image: { type: String, require: false },
  // Сбд цирк-н баруун талд миний дэлгүүрийн чанх хойно 10р байр
});
export const help = mongoose.model("help", helpSchema);
