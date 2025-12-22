import React, { useEffect, useRef, useState, useCallback } from "react";
import FilesPanel from "./FilesPanel";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useAuth } from "../hooks/useAuth.js";

export default function Homepage({ selectedChat, onChatsUpdated }) {
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

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ------------------------------------------
     LOAD EXISTING CHAT (SAFE VERSION)
  ------------------------------------------- */

  const loadChat = useCallback((chat) => {
    if (!chat) {
      setChatNumber(null);
      setMessages([]);
      setTitle("New Chat");
      return;
    }

    setChatNumber(chat.chatNumber);
    setMessages(chat.messages);
    setTitle(chat.title || "Untitled Chat");
  }, []);

  // When sidebar selects a chat → load it
  useEffect(() => {
    if (selectedChat !== undefined) {
      // defer state update to avoid synchronous setState warning
      queueMicrotask(() => loadChat(selectedChat));
    }
  }, [selectedChat, loadChat]);

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

    if (onChatsUpdated) onChatsUpdated();
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

      if (onChatsUpdated) onChatsUpdated();

      return data.chat;
    }
  }

  /* ------------------------------------------
     APPEND MESSAGE
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
     SEND MESSAGE
  ------------------------------------------- */
  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    // If first message → create new chat
    if (!chatNumber) {
      const NewChat = await startChat(userMessage);

      await appendMessage("", "Welcome! Chat started successfully.");
      return;
    }

    // Existing chat
    const botReply = `You said: "${userMessage}"`; // Temporary bot
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

          {/* Chat Messages */}
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
