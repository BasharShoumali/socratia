import React, { useEffect, useRef, useState } from "react";

export default function Homepage() {
  // Chat state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, how can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Files (dummy data)
  const [files] = useState([
    { id: 1, name: "Report Q1.pdf", type: "document" },
    { id: 2, name: "Notes.txt", type: "document" },
    { id: 3, name: "Diagram.png", type: "image" },
  ]);
  const [fileTab, setFileTab] = useState("all");

  // Scroll to bottom when chat updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `You said: "${userMessage.text}"` },
      ]);
    }, 600);
  }

  const filteredFiles = files.filter(
    (f) => fileTab === "all" || f.type === fileTab
  );

  return (
    <div className="h-[calc(100vh-4rem)] p-6">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* LEFT — Files */}
        <aside className="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 border rounded flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex px-3 py-2 border-b dark:border-gray-800 gap-2">
            {[
              { id: "all", label: "All" },
              { id: "document", label: "Documents" },
              { id: "image", label: "Images" },
            ].map((t) => (
              <button
                key={t.id}
                className={`text-sm px-3 py-1 rounded ${
                  fileTab === t.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300"
                }`}
                onClick={() => setFileTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Files list */}
          <div className="p-3 overflow-y-auto flex-1">
            {filteredFiles.length === 0 ? (
              <div className="text-sm text-gray-500">
                No uploaded files yet.
              </div>
            ) : (
              <ul className="space-y-2">
                {filteredFiles.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs">
                        {f.type === "image" ? "IMG" : "DOC"}
                      </div>
                      <div className="text-sm">{f.name}</div>
                    </div>
                    <div className="text-xs text-gray-400">1.2MB</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* MIDDLE — Chat */}
        <section className="col-span-12 lg:col-span-6 flex flex-col bg-white dark:bg-gray-900 border rounded overflow-hidden">
          <div className="p-4 border-b dark:border-gray-800">
            <h2 className="text-lg font-semibold">Chat</h2>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Anchor for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t dark:border-gray-800 bg-white dark:bg-gray-900 flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-md border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              placeholder="Write your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </section>

        {/* RIGHT — Statistics */}
        <aside className="col-span-12 lg:col-span-3 bg-white dark:bg-gray-900 border rounded p-4">
          <h3 className="text-sm font-semibold mb-3">Statistics</h3>
          <div className="text-xs text-gray-500">
            Placeholder for future stats and analytics.
          </div>
        </aside>
      </div>
    </div>
  );
}
