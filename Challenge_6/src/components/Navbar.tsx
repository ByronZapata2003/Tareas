import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={navStyle}>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link to="/stack" style={linkStyle}>Book Stack</Link>
        <Link to="/queue" style={linkStyle}>ATM Queue</Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: "white", fontSize: "14px" }}>{user}</span>
        <button onClick={handleLogout} style={btnStyle}>Logout</button>
      </div>
    </div>
  );
}

const navStyle: React.CSSProperties = {
  backgroundColor: "#2c3e50",
  padding: "12px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle: React.CSSProperties = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
};

const btnStyle: React.CSSProperties = {
  padding: "6px 12px",
  backgroundColor: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px",
};