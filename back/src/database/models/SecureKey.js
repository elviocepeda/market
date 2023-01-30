import mongoose from "mongoose";

const secureKeySchema = mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("SecureKey", secureKeySchema);
