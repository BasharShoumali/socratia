import React from "react";

const NotFound = ({ navigate } = {}) => {
  return (
    <div className="card max-w-md mx-auto mt-12 p-6 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">404 — Page not found</h2>
      <p className="mb-4 text-sm text-muted">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div>
        <button
          className="btn-primary"
          onClick={() =>
            navigate ? navigate("/") : (window.location.href = "/")
          }
        >
          Go home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
