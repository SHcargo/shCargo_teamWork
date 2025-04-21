import mongoose from "mongoose";
const truckCodeSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, require: true, ref: "users" },
  totalPrice: { type: Number, require: true },
  goodsItems: [
    {
      item: { type: String, require: false },
      quatity: { type: Number, require: false },
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    require: true,
  },
});
export const TruckCode = mongoose.model("truckCode", truckCodeSchema);
