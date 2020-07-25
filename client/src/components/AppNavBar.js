import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import Logout from "./Auth/logout";
import { useSelector } from "react-redux";

const AppNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const toggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <>
      <NavItem>
        <Logout />
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
