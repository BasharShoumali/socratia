import React from "react";
import { NavLink } from "react-router-dom";
import SidebarIcon from "./SidebarIcon";

export default function SidebarNavItem({ item, navigate, onClose }) {
  return (
    <NavLink
      to={item.to}
      onClick={(e) => {
        if (navigate) {
          e.preventDefault();
          navigate(item.to);
        }
        onClose();
      }}
      className={({ isActive }) =>
        `group flex items-center px-3 py-2 text-sm rounded-md transition ${
          isActive
            ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`
      }
    >
      <SidebarIcon name={item.icon} />
      <span className="ml-3">{item.name}</span>
    </NavLink>
  );
}
