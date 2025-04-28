// models/Location.js
const mongoose = require("mongoose");

const PinPointAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  detail: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const PinPointAddress = mongoose.model(
  "PinPointAddress",
  PinPointAddressSchema
);

module.exports = Location;
