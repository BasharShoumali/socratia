import React, { useState } from "react";
import styles from "../register/Register.module.css";

const Login = ({ navigate } = {}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Placeholder: replace with real login API call
    try {
      if (!email || !password) throw new Error("Missing email or password");
      // simulate success
      setTimeout(() => {
        setLoading(false);
        alert("Logged in (demo)");
      }, 600);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="card max-w-md mx-auto mt-12 p-6 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      {error && <div className="mb-4 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full px-2 py-1 rounded"
          />
        </div>

        <div>
          <button type="submit" className="w-full btn-primary py-2">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            className={styles.link}
            onClick={() => {
              if (navigate) navigate("/register");
              else {
                window.history.pushState({}, "", "/register");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }
            }}
          >
            Create an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
