import React, { useState } from "react";
import styles from "./Register.module.css";

const Register = ({ navigate } = {}) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const endpoint = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")}/register`
    : "/api/register";

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.firstName.trim() || !form.lastName.trim())
      return "First and last name are required.";
    if (!form.username.trim()) return "Username is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!form.password) return "Password is required.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Registration failed");
      }

      setSuccess("Registration successful. You can now log in.");
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        phone: "",
        email: "",
        password: "",
      });

      // Optionally redirect to login page after a short delay
      setTimeout(() => {
        if (navigate) navigate("/login");
        else if (window.location.pathname !== "/login") {
          window.history.pushState({}, "", "/login");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }, 1200);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`card w-full mx-auto mt-12 p-6 border rounded shadow-sm ${styles.container}`}
    >
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

      {error && <div className="mb-4 text-red-700">{error}</div>}
      {success && <div className="mb-4 text-green-700">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">First name</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last name</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-2 py-1 rounded ${styles.input}`}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-60"
          >
            {loading ? "Registering…" : "Register"}
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            className={styles.link}
            onClick={() => {
              if (navigate) navigate("/login");
              else {
                window.history.pushState({}, "", "/login");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }
            }}
          >
            I have an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
