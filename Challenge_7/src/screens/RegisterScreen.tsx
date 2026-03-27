import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "../styles/main.scss";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) { setError("Fill all fields"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    try {
      await register(email, password);
      navigate("/tasks");
    } catch {
      setError("Could not create account. Email may already be in use.");
    }
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <Card.Body>
          <h2 className="auth-title">Register</h2>
          <p className="auth-subtitle">Create your account</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
              />
            </Form.Group>
            <Button variant="dark" className="w-100" onClick={handleRegister}>
              Create Account
            </Button>
          </Form>

          <p className="auth-link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}