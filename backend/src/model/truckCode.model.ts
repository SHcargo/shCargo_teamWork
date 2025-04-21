import mongoose from "mongoose";

const truckCodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  goodsItems: [
    {
      item: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pendingAt: Date,
  cancelledAt: Date,
  deliveredAt: Date,

  statusHistory: [
    {
      status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "DELIVERED"],
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Pre-save hook to track status changes and timestamps
truckCodeSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    const now = new Date();

    // Update the corresponding timestamp
    if (this.status === "PENDING") {
      this.pendingAt = now;
    } else if (this.status === "CANCELLED") {
      this.cancelledAt = now;
    } else if (this.status === "DELIVERED") {
      this.deliveredAt = now;
    }

    // Add to status history
    this.statusHistory.push({
      status: this.status,
      changedAt: now,
    });
  }

  next();
});

export const TruckCode = mongoose.model("TruckCode", truckCodeSchema);
