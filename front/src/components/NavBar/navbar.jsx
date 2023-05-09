import { Nav, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { Bag } from "../Bag/bag";

import { BiUser } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" sticky="top">
      <Container fluid>
        <Link className="navbar-brand" to={`/`}>
          YourStyle
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to={`/`}>
              Inicio
            </Link>
            <NavDropdown title="Products" menuVariant="dark">
              <Link className="dropdown-item" to={`/products`}>
                Ver todos lo productos
              </Link>
              <Link className="dropdown-item" to={`/type/remeras`}>
                Remeras
              </Link>
              <Link className="dropdown-item" to={`/type/pantalones`}>
                Pants
              </Link>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link className="nav-link" to={`/user`}>
              <BiUser className="fs-4" />
            </Link>
            <Link className="nav-link" to={`/chat`}>
              <BsChat className="fs-4" />
            </Link>
            <Link className="nav-link" to={`/cart`}>
              <Bag />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
