import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    const success = login(email, password);
    if (success) {
      navigate("/stack");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "8px" }}>Login</h1>
        <p style={{ color: "#888", marginBottom: "20px", fontSize: "14px" }}>
          Challenge 06
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={inputStyle}
          />
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
          <button onClick={handleLogin} style={btnStyle}>
            Login
          </button>
        </div>

        <p style={{ marginTop: "16px", fontSize: "12px", color: "#aaa" }}>
          user@mail.com / 123
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f0f0f0",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  width: "320px",
  textAlign: "center",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

const btnStyle: React.CSSProperties = {
  padding: "10px",
  backgroundColor: "#2c3e50",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "bold",
};