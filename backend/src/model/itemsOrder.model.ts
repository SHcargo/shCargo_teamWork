import mongoose from "mongoose";
const STATUS = ["PENDING", "CANCELLED", "DELIVERED"];

const itemsOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  goodsItems: [
    {
      item: { type: mongoose.Types.ObjectId, ref: "truckItems" },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  status: {
    type: String,
    enum: STATUS,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  statusHistory: [
    {
      status: {
        type: String,
        enum: STATUS,
      },
      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Pre-save hook to track status changes and timestamps
itemsOrderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    const now = new Date();

    // // Update the corresponding timestamp
    // if (this.status === "PENDING") {
    //   this.pendingAt = now;
    // } else if (this.status === "CANCELLED") {
    //   this.cancelledAt = now;
    // } else if (this.status === "DELIVERED") {
    //   this.deliveredAt = now;
    // }

    // Add to status history
    this.statusHistory.push({
      status: this.status,
      changedAt: now,
    });
  }

  next();
});

export const ItemsOrder = mongoose.model("itemsOrder", itemsOrderSchema);
