import React from "react";

export default function SidebarIcon({ name, className = "h-5 w-5" }) {
  const icons = {
    home: (
      <path
        d="M3 12l9-7 9 7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    login: (
      <>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeWidth="1.5" />
        <path d="M10 17l5-5-5-5" strokeWidth="1.5" />
        <path d="M15 12H3" strokeWidth="1.5" />
      </>
    ),
    posts: (
      <>
        <path
          d="M21 15V6a2 2 0 0 0-2-2H7L3 6v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
          strokeWidth="1.5"
        />
        <path d="M7 10h10M7 14h6" strokeWidth="1.5" />
      </>
    ),
    content: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      {icons[name] || null}
    </svg>
  );
}
