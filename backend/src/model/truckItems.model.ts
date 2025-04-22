import mongoose from "mongoose";
const truckItemsSchema = new mongoose.Schema({
  truckCode: { type: String, require: true },
  notes: { type: String, require: false },
});
export const TruckItems = mongoose.model("truckItems", truckItemsSchema);
