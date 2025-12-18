// controllers/chatController.js

import Chat from "../models/chat.js";
import UserChatCounter from "../models/UserChatCounter.js";

/**
 * Start a new chat session for a user.
 */
export const startChat = async (req, res) => {
  try {
    const { username, message } = req.body;

    if (!username || !message) {
      return res
        .status(400)
        .json({ error: "username and message are required" });
    }

    // Auto-increment chatNumber per user
    let counter = await UserChatCounter.findOne({ username });

    if (!counter) {
      counter = await UserChatCounter.create({
        username,
        lastChatNumber: 1,
      });
    } else {
      counter.lastChatNumber += 1;
      await counter.save();
    }

    const chatNumber = counter.lastChatNumber;

    // Create new chat document
    const chat = await Chat.create({
      username,
      chatNumber,
      messages: [
        {
          messageNumber: 1,
          message,
          answer: "",
        },
      ],
    });

    return res.json({ success: true, chat });
  } catch (err) {
    console.error("Start chat error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Append a user message + bot answer to an existing chat.
 */
export const appendMessage = async (req, res) => {
  try {
    const { username, chatNumber, message, answer } = req.body;

    // FIXED VALIDATION
    if (
      !username ||
      chatNumber === undefined ||
      chatNumber === null ||
      !message
    ) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const chat = await Chat.findOne({ username, chatNumber });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const next = chat.messages.length + 1;

    chat.messages.push({
      messageNumber: next,
      message,
      answer: answer || "",
    });

    await chat.save();

    return res.json({ success: true, chat });
  } catch (err) {
    console.error("Append message error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all chats of a user
 */
export const getUserChats = async (req, res) => {
  try {
    const { username } = req.params;

    const chats = await Chat.find({ username }).sort({ chatNumber: -1 });

    return res.json({ success: true, chats });
  } catch (err) {
    console.error("Get chats error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
