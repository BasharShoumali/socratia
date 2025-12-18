import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("socratia_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("AuthContext localStorage error:", e);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        // Save ONLY the fields you want
        const safeUser = {
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
        };

        localStorage.setItem("socratia_user", JSON.stringify(safeUser));
      } else {
        localStorage.removeItem("socratia_user");
      }
    } catch (e) {
      console.error("AuthContext localStorage save error:", e);
    }
  }, [user]);

  const login = (userObj) => {
    // Ensure only the needed fields are stored
    const safeUser = {
      username: userObj.username || "",
      email: userObj.email || "",
      phone: userObj.phone || "",
    };
    setUser(safeUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
