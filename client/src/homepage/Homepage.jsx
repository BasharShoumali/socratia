import React, { useEffect, useRef, useState } from "react";
import FilesPanel from "./FilesPanel";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useAuth } from "../hooks/useAuth.js";

export default function Homepage() {
  const { user } = useAuth();

  // Backend chat state
  const [chatNumber, setChatNumber] = useState(null);
  const [title, setTitle] = useState("New Chat");
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const [files] = useState([
    { id: 1, name: "Report Q1.pdf", type: "document" },
    { id: 2, name: "Notes.txt", type: "document" },
    { id: 3, name: "Diagram.png", type: "image" },
  ]);

  // Scroll to bottom on every message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------------------------------
     LOAD EXISTING CHAT (from sidebar)
  ------------------------------------------- */
  async function loadChat(chat) {
    if (!chat) {
      // Start fresh
      setChatNumber(null);
      setMessages([]);
      setTitle("New Chat");
      return;
    }

    setChatNumber(chat.chatNumber);
    setMessages(chat.messages);
    setTitle(chat.title || "Untitled Chat");
  }

  /* ------------------------------------------
     UPDATE CHAT TITLE
  ------------------------------------------- */
  async function updateChatTitle(newTitle) {
    if (!chatNumber) return;

    setTitle(newTitle);

    await fetch("/api/chat/title", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        chatNumber,
        title: newTitle,
      }),
    });
  }

  /* ------------------------------------------
     START NEW CHAT SESSION
  ------------------------------------------- */
  async function startChat(firstMessage) {
    const res = await fetch("/api/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        message: firstMessage,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setChatNumber(data.chat.chatNumber);
      setMessages(data.chat.messages);
      setTitle(data.chat.title || "New Chat");
      return data.chat;
    }
  }

  /* ------------------------------------------
     APPEND NEXT MESSAGE IN SAME CHAT
  ------------------------------------------- */
  async function appendMessage(message, answer = "") {
    const res = await fetch("/api/chat/append", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        chatNumber,
        message,
        answer,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setMessages(data.chat.messages);
    }
  }

  /* ------------------------------------------
     SEND MESSAGE LOGIC
  ------------------------------------------- */
  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // CASE 1: first message → start new chat
    if (!chatNumber) {
      const newChat = await startChat(userMessage);

      // Add welcome reply inside SAME entry
      await appendMessage("", "Welcome! Chat started successfully.");

      return;
    }

    // CASE 2: Existing chat → append message
    const botReply = `You said: "${userMessage}"`; // Placeholder AI

    await appendMessage(userMessage, botReply);
  }

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* LEFT FILE PANEL */}
        <FilesPanel files={files} />

        {/* CHAT SECTION */}
        <section className="col-span-12 lg:col-span-9 flex flex-col bg-white dark:bg-gray-900 border rounded overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b dark:border-gray-800 flex items-center gap-2">
            <h2 className="text-lg font-semibold flex-1">
              {title} {chatNumber ? `(#${chatNumber})` : ""}
            </h2>

            {chatNumber && (
              <input
                className="px-2 py-1 border rounded text-sm dark:bg-gray-800 dark:border-gray-600"
                value={title}
                onChange={(e) => updateChatTitle(e.target.value)}
              />
            )}
          </div>

          {/* Chat bubbles */}
          <ChatMessages messages={messages} messagesEndRef={messagesEndRef} />

          {/* Chat Input */}
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </section>
      </div>
    </div>
  );
}
