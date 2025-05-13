import mongoose from "mongoose";

const choosePickupOrDeliverySchema = new mongoose.Schema({
  deliveryAddress: {
    lat: { type: Number,  },  // Ensure lat is required
    lng: { type: Number,  },  // Ensure lng is required
    detail: { type: String,  },  // Ensure detail is required
    district: { type: String,  },  // Ensure district is required
    khoroo: { type: String, },  // Ensure khoroo is required
    accuracy: { type: Number, },  // Ensure accuracy is required
  },
  status: {
    type: String,
    enum: ["Салбараас авах", "Хүргүүлэх"],
    default: "Салбараас авах",
  },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  phoneNumber: { type: String, required: true },
  trackingNumber: { type: String, required: true },
});

// Optionally, add indexes for frequently queried fields
choosePickupOrDeliverySchema.index({ userId: 1 });
choosePickupOrDeliverySchema.index({ trackingNumber: 1 });

// Model creation
export const choosePickupOrDelivery = mongoose.model(
  "choosePickupOrDelivery",
  choosePickupOrDeliverySchema
);
