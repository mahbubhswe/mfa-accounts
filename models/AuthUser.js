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
  hasUpdatePer: {
    type: Boolean,
    required: true,
    default: false,
  },
  userType: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
});
const AuthUser =
  mongoose.models.AuthUser || mongoose.model("AuthUser", userSchema);
export default AuthUser;
