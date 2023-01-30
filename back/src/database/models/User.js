import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  uuid: {
    type: String,
    default: "",
    required: true,
  },
  role: {
    type: String,
    default: "",
    required: false,
  },
  name: {
    type: String,
    default: "",
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    default: "",
    required: true,
    min: 6,
    max: 1024,
  },
  phone: {
    type: String,
    default: "",
    required: true,
    min: 6,
    max: 1024,
  },
  birthDate: {
    type: String,
    default: "",
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    default: "",
    required: true,
  },
  avatar: {
    type: String,
    default: "",
    required: false,
  },
  createdAt: {
    type: String,
    default: "",
    required: true,
  },
  lastEdit: {
    type: String,
    default: "",
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
    required: false,
  },
  isConnected: {
    type: Boolean,
    default: false,
    required: false,
  },
  favorites: {
    type: Array,
    default: [],
    required: false,
  },
  rating: {
    type: String,
    default: "",
    required: false,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
