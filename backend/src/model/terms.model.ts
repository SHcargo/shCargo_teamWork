import mongoose from "mongoose";

const termsSchema = new mongoose.Schema({
  registration: {
    type: Map,
    of: String,
    required: false,
  },
  condition: {
    type: Map,
    of: String,
    required: false,
  },
  price: {
    type: Map,
    of: String,
    required: false,
  },
  payment: {
    type: Map,
    of: String,
    required: false,
  },
  shipping: {
    type: Map,
    of: String,
    required: false,
  },
  deliver: {
    type: Map,
    of: String,
    required: false,
  },
  deliverPrice: {
    type: Map,
    of: String,
    required: false,
  },
  forbidden: {
    type: Map,
    of: String,
    required: false,
  },
  responsibility: {
    type: Map,
    of: String,
    required: false,
  },
  loss: {
    type: Map,
    of: String,
    required: false,
  },
  isVerified: { type: Boolean, default: false },
});

export const Terms = mongoose.model("terms", termsSchema);
