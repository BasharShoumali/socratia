import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Register from "./auth/register/register";
import Login from "./auth/login/login";
import Homepage from "./homepage/Homepage";
import NotFound from "./NotFound.jsx";

/* -------------------- Theme Hook -------------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;

      // fallback to system theme
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.log(e);
    }
  }, [theme]);

  return [theme, setTheme];
}

/* -------------------- Router Wrapper -------------------- */

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Homepage navigate={navigate} />} />
      <Route path="/register" element={<Register navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />

      {/* Unknown routes -> NotFound */}
      <Route path="*" element={<NotFound navigate={navigate} />} />
    </Routes>
  );
}

/* -------------------- Main App -------------------- */

function App() {
  const [theme, setTheme] = useTheme();

  return (
    <BrowserRouter>
      <div className="App">
        {/* Theme toggle */}
        <button
          className="theme-toggle"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
