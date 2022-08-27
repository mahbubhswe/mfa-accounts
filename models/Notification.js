import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tansactionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
