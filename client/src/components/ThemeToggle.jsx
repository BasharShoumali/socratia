import React from "react";
import Button from "./Button.jsx";

export default function ThemeToggle({ theme, setTheme, className = "" }) {
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`theme-toggle ${className}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </Button>
  );
}
