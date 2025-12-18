import React from "react";

export default function ChatMessages({ messages, messagesEndRef }) {
  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
      style={{ scrollBehavior: "smooth" }}
    >
      {messages.map((msg, idx) => (
        <div key={idx} className="space-y-1">
          {/* USER MESSAGE */}
          {msg.message && (
            <div className="max-w-[80%] ml-auto px-4 py-2 rounded-xl text-sm bg-indigo-600 text-white">
              {msg.message}
            </div>
          )}

          {/* BOT ANSWER */}
          {msg.answer && msg.answer.trim() !== "" && (
            <div className="max-w-[80%] mr-auto px-4 py-2 rounded-xl text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-100">
              {msg.answer}
            </div>
          )}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
