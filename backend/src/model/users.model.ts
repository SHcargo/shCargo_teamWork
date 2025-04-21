import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: false },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  isVerified: { type: Boolean, required: false, default: false },
  createAt: { type: Date, default: Date.now },
});

export const Users = mongoose.model("users", usersSchema);
