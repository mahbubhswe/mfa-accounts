import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "padding",
  },
  createdAt: { type: Date, default: Date.now },
});
const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
export default Transaction;
