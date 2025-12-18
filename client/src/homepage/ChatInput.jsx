import React from "react";

export default function ChatInput({ input, setInput, sendMessage }) {
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeyDown(e) {
    // ENTER → send message
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // يمنع عمل سطر جديد
      sendMessage();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t dark:border-gray-800">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>

      <div
        className="
        flex items-center px-3 py-2 
        bg-neutral-100 dark:bg-neutral-800
        "
      >
        {/* Attach file button */}
        <button
          type="button"
          className="
          p-2 text-gray-600 dark:text-gray-300 
          rounded-sm cursor-pointer 
          hover:text-black dark:hover:text-white 
          hover:bg-gray-200 dark:hover:bg-gray-700
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
            />
          </svg>
        </button>

        {/* Upload image */}
        <button
          type="button"
          className="
          p-2 text-gray-600 dark:text-gray-300 
          rounded-sm cursor-pointer 
          hover:text-black dark:hover:text-white 
          hover:bg-gray-200 dark:hover:bg-gray-700
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M16 18H8l2.5-6 2 4 1.5-2 2 4Zm-1-8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
            />
          </svg>
        </button>

        {/* Textarea */}
        <textarea
          id="chat"
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your message..."
          className="
          mx-4 flex-1
          bg-white dark:bg-gray-800 
          border border-gray-300 dark:border-gray-600 
          text-gray-800 dark:text-gray-100 
          text-sm rounded-md 
          focus:ring-indigo-500 focus:border-indigo-500
          block w-full px-3 py-2.5 
          placeholder:text-gray-500 dark:placeholder:text-gray-400
          resize-none
          "
        />

        {/* Send button */}
        <button
          type="submit"
          className="
          inline-flex justify-center p-2 
          text-indigo-600 dark:text-indigo-400 
          rounded-full cursor-pointer 
          hover:bg-indigo-100 dark:hover:bg-indigo-900
          "
        >
          <svg
            className="w-6 h-6 rotate-90 rtl:-rotate-90"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
