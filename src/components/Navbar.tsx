import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function TopNavbar() {
  return (
    <Navbar bg="light" expand="lg" className="w-100 position-relative">
      <Container fluid>
        <Navbar.Brand href="#">GenTest</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Sobre o Projeto</Nav.Link>
            <Nav.Link as={Link} to="/trabalhos">Trabalhos Relacionados</Nav.Link>
            <Nav.Link as={Link} to="/contato">Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
