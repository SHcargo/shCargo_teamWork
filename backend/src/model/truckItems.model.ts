import mongoose from "mongoose";
const truckItemsSchema = new mongoose.Schema({
  truckCode: { type: String, require: true },
  notes: { type: String, require: false },
  user: { type: Number, require: true },
});
export const TruckItems = mongoose.model("truckItems", truckItemsSchema);
