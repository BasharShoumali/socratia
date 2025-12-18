import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Register from "./auth/register/register";
import Login from "./auth/login/login";
import Homepage from "./homepage/Homepage";
import NotFound from "./NotFound.jsx";

import Sidebar from "./components/Sidebar/Sidebar";
import ThemeToggle from "./components/ThemeToggle.jsx";
import Button from "./components/Button.jsx";
import { AuthProvider } from "./contexts/AuthContext";

/* -------------------- Theme Hook -------------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
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
      <Route path="*" element={<NotFound navigate={navigate} />} />
    </Routes>
  );
}

/* -------------------- Main App -------------------- */

export default function App() {
  const [theme, setTheme] = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* ENTIRE LAYOUT */}
        <div className="flex w-full min-h-screen">
          {/* SIDEBAR */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* PAGE CONTENT WRAPPER */}
          <div className="flex flex-col flex-1 md:pl-64">
            {/* HEADER */}
            <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-transparent">
              <div className="flex items-center justify-between px-4 py-3">
                {/* MOBILE MENU BUTTON */}
                <button
                  className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setSidebarOpen(true)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* RIGHT BUTTONS */}
                <div className="flex flex-row items-center gap-3 ml-auto">
                  <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
              </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="p-6 flex-1">
              <AppRoutes />
            </main>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
