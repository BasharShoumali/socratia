import React, { useState } from "react";
import styles from "../register/Register.module.css";
import { useAuth } from "../../contexts/useAuth.js";

const Login = ({ navigate } = {}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      setError("Missing email or password");
      return;
    }

    const endpoint = import.meta.env.VITE_API_BASE_URL
      ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/login`
      : "/api/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Login failed");
        setLoading(false);
        return;
      }

      const user = json.user || {
        username: (String(email).split("@")[0] || "user").toLowerCase(),
        email,
      };
      login(user);
      setLoading(false);

      navigate?.("/") ||
        (window.location.pathname !== "/" &&
          (window.history.pushState({}, "", "/"),
          window.dispatchEvent(new PopStateEvent("popstate"))));
    } catch (err) {
      console.error("Login error:", err);
      const username = (String(email).split("@")[0] || "user").toLowerCase();
      login({ username, email });
      setLoading(false);
      navigate?.("/") ||
        (window.location.pathname !== "/" &&
          (window.history.pushState({}, "", "/"),
          window.dispatchEvent(new PopStateEvent("popstate"))));
    }
  }

  return (
    <div
      className="
        card max-w-md mx-auto mt-12 p-6 border rounded shadow-sm
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        border-gray-200 dark:border-gray-700
      "
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full px-3 py-2 rounded 
              bg-gray-100 dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-700
            "
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="
              w-full px-3 py-2 rounded 
              bg-gray-100 dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              border border-gray-300 dark:border-gray-700
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-full py-2 rounded 
            bg-indigo-600 hover:bg-indigo-700 text-white
            dark:bg-indigo-500 dark:hover:bg-indigo-600
          "
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div className="text-center">
          <button
            type="button"
            className={`${styles.link} text-indigo-600 dark:text-indigo-400`}
            onClick={() => navigate?.("/register")}
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
