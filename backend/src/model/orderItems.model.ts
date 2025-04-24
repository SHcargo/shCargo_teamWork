import mongoose from "mongoose";
const OrderItemSchema = new mongoose.Schema({
  trackingNumber: { type: String, require: false },
  notes: { type: String, require: false },
  userId: { type: mongoose.Types.ObjectId, require: true },
});
export const OrderItem = mongoose.model("orderItems", OrderItemSchema);
