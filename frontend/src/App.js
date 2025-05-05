// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RequestForm from "./components/RequestForm";
import ReviewPage from "./components/ReviewPage";
import AdminSettings from "./components/AdminSettings";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import "./App.css";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user || (role && user.role !== role && user.role !== "admin")) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<RequestForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review" element={
            <ProtectedRoute role="agent">
              <ReviewPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminSettings />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
