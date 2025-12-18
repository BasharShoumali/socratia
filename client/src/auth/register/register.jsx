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

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.message || "Registration failed");
        setLoading(false);
        return;
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

      setTimeout(() => navigate?.("/login"), 1200);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`
        card w-full mx-auto mt-12 p-6 border rounded shadow-sm
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        border-gray-200 dark:border-gray-700
        ${styles.container}
      `}
    >
      <h2 className="text-2xl font-semibold mb-4">Create an account</h2>

      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          "firstName",
          "lastName",
          "username",
          "phone",
          "email",
          "password",
        ].map((key) => (
          <div key={key}>
            <label className="block text-sm mb-1">{key}</label>
            <input
              name={key}
              type={key === "password" ? "password" : "text"}
              value={form[key]}
              onChange={handleChange}
              className="
                  w-full px-3 py-2 rounded 
                  bg-gray-100 dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  border border-gray-300 dark:border-gray-700
                "
            />
          </div>
        ))}

        <button
          disabled={loading}
          className="
            w-full py-2 rounded 
            bg-indigo-600 hover:bg-indigo-700 text-white
            dark:bg-indigo-500 dark:hover:bg-indigo-600
          "
        >
          {loading ? "Registering…" : "Register"}
        </button>

        <div className="text-center">
          <button
            type="button"
            className={`${styles.link} text-indigo-600 dark:text-indigo-400`}
            onClick={() => navigate?.("/login")}
          >
            I have an account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
