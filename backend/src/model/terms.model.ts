import mongoose from "mongoose";
const termsSchema = new mongoose.Schema({
  registration: [{ type: String, require: false }],
  condition: [{ type: String, require: false }],
  price: [{ type: String, require: false }],
  payment: [{ type: String, require: false }],
  shipping: [{ type: String, require: false }],
  deliver: [{ type: String, require: false }],
  forbidden: [{ type: String, require: false }],
  responsibility: [{ type: String, require: false }],
  loss: [{ type: String, require: false }],
});
export const Terms = mongoose.model("terms", termsSchema);
