import { useState } from "react";

export default function useChat(username) {
  const [chatNumber, setChatNumber] = useState(null);
  const [messages, setMessages] = useState([]);

  // Start new chat
  async function startChat(messageText) {
    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message: messageText,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setChatNumber(data.chat.chatNumber);
      setMessages(data.chat.messages);
    }

    return data;
  }

  // Append message to existing chat
  async function append(messageText, answerText) {
    if (!chatNumber) return console.error("Chat not started yet");

    const res = await fetch("/api/chat/append", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        chatNumber,
        message: messageText,
        answer: answerText,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages(data.chat.messages);
    }

    return data;
  }

  return {
    chatNumber,
    messages,
    startChat,
    append,
  };
}
