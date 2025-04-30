import mongoose from "mongoose";

// Define valid statuses
const STATUS = ["Бүртгэсэн", "Замдаа", "УБ-д ирсэн", "Хаагдсан"];

// Create schema for item orders
const itemsOrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  trackingNumber: {
    type: String,
    required: true,
  },
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

// Pre-save hook to track status changes and convert to Mongolia time
itemsOrderSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    const now = new Date();

    // Convert UTC time to Mongolia time (Asia/Ulaanbaatar)
    const mongoliaTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Ulaanbaatar" })
    );

    this.statusHistory.push({
      status: this.status,
      changedAt: mongoliaTime,
    });
  }

  next();
});

// Export the model
export const ItemsOrder = mongoose.model("itemsOrder", itemsOrderSchema);
