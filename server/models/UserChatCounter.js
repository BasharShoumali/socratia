import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  lastChatNumber: { type: Number, default: 0 },
});

export default mongoose.model("UserChatCounter", counterSchema);
