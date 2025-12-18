import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  username: { type: String, required: true },
  chatNumber: { type: Number, required: true },
  messages: [
    {
      messageNumber: Number,
      message: String,
      answer: String,
    },
  ],
});

export default mongoose.model("Chat", chatSchema);
