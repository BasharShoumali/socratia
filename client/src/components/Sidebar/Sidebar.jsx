import React, { useEffect, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarAccount from "./SidebarAccount";
import SidebarTip from "./SidebarTip";
import SidebarChatItem from "./SidebarChatItem";
import { useAuth } from "../../hooks/useAuth.js";

export default function Sidebar({ navigate, isOpen, onClose, onSelectChat }) {
  const { user, logout } = useAuth();
  const [chats, setChats] = useState([]);

  // Load all chats for the logged user
  async function loadChats() {
    if (!user) return;
    const res = await fetch(`/api/chat/${user.username}`);
    const data = await res.json();

    if (data.success) {
      setChats(data.chats);
    }
  }

  useEffect(() => {
    loadChats();
  }, [user]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block 
          bg-white dark:bg-gray-900 
          border-r border-gray-100 dark:border-gray-800 overflow-y-auto`}
      >
        <SidebarHeader onClose={onClose} />

        <SidebarAccount
          user={user}
          logout={logout}
          navigate={navigate}
          onClose={onClose}
        />

        {/* NEW CHAT BUTTON */}
        <button
          onClick={() => onSelectChat(null)} // create a new chat
          className="mx-3 my-3 w-[90%] py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
        >
          + Start New Chat
        </button>

        {/* USER CHAT LIST */}
        <div className="px-2 mt-4">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Past Chats
          </h3>

          <div className="mt-2 space-y-1">
            {chats.map((chat) => (
              <SidebarChatItem
                key={chat.chatNumber}
                chat={chat}
                onSelect={() => onSelectChat(chat)}
                navigate={navigate}
                onClose={onClose}
              />
            ))}
          </div>
        </div>

        <SidebarTip />
      </aside>
    </>
  );
}
