import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    required: true,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});
const AuthUser =
  mongoose.models.AuthUser || mongoose.model("AuthUser", userSchema);
export default AuthUser;
