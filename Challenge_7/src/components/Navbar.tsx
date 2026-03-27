import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Navbar as BsNavbar, Container, Nav, Button } from "react-bootstrap";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand>Challenge 07</BsNavbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/tasks">My Tasks</Nav.Link>
        </Nav>
        <Nav>
          <span className="navbar-text text-light me-3">
            {user?.email}
          </span>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </BsNavbar>
  );
}