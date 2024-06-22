// Navbar.tsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

import "../App.css";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <Nav className="wrapper-top" fill pills>
      <NavItem>
        <NavLink active={pathname === '/app/orgs'} href="/app/orgs">
          Orgs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={pathname === '/app/users'} href="/app/users">
          Users
        </NavLink>
      </NavItem>
      <NavItem onClick={handleLogout}>
        <NavLink href="/">
            Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Navbar;
