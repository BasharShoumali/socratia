import React from "react";
import SidebarNavItem from "./SidebarNavItem"; // ← FIXED

export default function SidebarNavSection({ title, items, navigate, onClose }) {
  return (
    <div className="px-2 mt-4">
      <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
        {title}
      </h3>

      <div className="mt-2 space-y-1">
        {items.map((item) => (
          <SidebarNavItem
            key={item.to}
            item={item}
            navigate={navigate}
            onClose={onClose}
          />
        ))}
      </div>
    </div>
  );
}
