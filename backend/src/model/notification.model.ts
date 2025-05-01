import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const notification = mongoose.model("notification", notificationSchema);
