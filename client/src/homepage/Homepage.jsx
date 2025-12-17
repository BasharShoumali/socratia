import React from "react";

const Homepage = ({ navigate } = {}) => {
  return (
    <div className="card max-w-3xl mx-auto mt-12 p-8 border rounded shadow-sm text-left">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">Welcome to Socratia</h1>
          <p className="text-muted mb-4">
            A simple app for managing users, built with React and Node. Create
            an account to get started or sign in if you already have one.
          </p>

          <div className="flex gap-3">
            <button
              className="btn-primary"
              onClick={() =>
                navigate
                  ? navigate("/register")
                  : (window.location.href = "/register")
              }
            >
              Get started
            </button>

            <button
              className="border px-3 py-2 rounded"
              onClick={() =>
                navigate
                  ? navigate("/login")
                  : (window.location.href = "/login")
              }
            >
              Sign in
            </button>
          </div>
        </div>

        <div className="flex-1 text-center">
          <div
            style={{ width: 220, height: 140, margin: "0 auto" }}
            className="rounded-lg bg-linear-to-br from-sky-500 to-indigo-600"
          />
        </div>
      </div>

      <hr className="my-6" />

      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted">
        <div>
          <h3 className="font-semibold">Fast setup</h3>
          <p>Register quickly and start exploring the features immediately.</p>
        </div>
        <div>
          <h3 className="font-semibold">Secure</h3>
          <p>Passwords are hashed and stored securely on the backend.</p>
        </div>
        <div>
          <h3 className="font-semibold">API ready</h3>
          <p>
            Server exposes endpoints for authentication and user management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
