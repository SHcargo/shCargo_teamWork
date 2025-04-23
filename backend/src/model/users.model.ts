import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, default: "irj awna" },

  truckCodeItem: [
    {
      item: { type: mongoose.Types.ObjectId, ref: "truckItems" },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],

  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
    required: true,
  },

  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Users = mongoose.model("users", usersSchema);
