import React from "react";
import { NavLink } from "react-router-dom"; // ← FIXED
import SidebarIcon from "./SidebarIcon";

export default function SidebarAccount({ user, logout, onClose, navigate }) {
  return (
    <div className="px-3 mb-3">
      {user ? (
        <div
          className="
            flex items-center px-3 py-2 rounded-md 
            bg-gray-100 dark:bg-gray-800
            text-gray-800 dark:text-gray-100
            border border-gray-200 dark:border-gray-700
          "
        >
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-medium">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="ml-3">
            <div className="text-sm font-medium">{user.username}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Signed in
            </div>
          </div>

          <button
            className="ml-auto text-sm text-red-600 hover:underline dark:text-red-400"
            onClick={() => {
              logout();
              onClose();
              navigate?.("/");
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <NavLink
          to="/login"
          className="
            group flex items-center px-3 py-2 text-sm rounded-md
            text-gray-700 hover:bg-gray-100
            dark:text-gray-300 dark:hover:bg-gray-800
          "
          onClick={(e) => {
            if (navigate) {
              e.preventDefault();
              navigate("/login");
            }
            onClose();
          }}
        >
          <SidebarIcon name="login" />
          <span className="ml-3">Sign in</span>
        </NavLink>
      )}
    </div>
  );
}
