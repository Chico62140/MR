// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = ({ theme, toggleTheme }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">📁 Request Portal</Link>
      </div>

      <div className="navbar-right">
        {/* Dark/Light Toggle */}
        <button onClick={toggleTheme} className="toggle-btn" title="Toggle Theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* Agent/Admin Access Buttons */}
        {user && (user.role === "agent" || user.role === "admin") && (
          <Link to="/review" className="nav-btn long" title="Review Requests">Review</Link>
        )}
        {user && user.role === "admin" && (
          <Link to="/admin" className="nav-btn long" title="Admin Panel">Admin</Link>
        )}

        {/* Login/Logout */}
        {!user ? (
          <Link to="/login" className="login-btn" title="Login">🔐</Link>
        ) : (
          <button onClick={logout} className="logout-btn" title="Logout">🚪</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
