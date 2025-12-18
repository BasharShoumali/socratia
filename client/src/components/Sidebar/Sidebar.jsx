import React from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarAccount from "./SidebarAccount";
import SidebarNavSection from "./SidebarNavSection";
import SidebarTip from "./SidebarTip";
import { useAuth } from "../../contexts/useAuth.js";

export default function Sidebar({ navigate, isOpen, onClose }) {
  const { user, logout } = useAuth();

  const nav = [
    { name: "Home", to: "/", icon: "home" },
    { name: "Content", to: "/content", icon: "content" },
    { name: "Posts", to: "/posts", icon: "posts" },
  ];

  const management = [{ name: "Settings", to: "/settings", icon: "settings" }];

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

        <SidebarNavSection
          title="Content"
          items={nav}
          navigate={navigate}
          onClose={onClose}
        />

        <SidebarNavSection
          title="Management"
          items={management}
          navigate={navigate}
          onClose={onClose}
        />

        <SidebarTip />
      </aside>
    </>
  );
}
