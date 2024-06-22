// Navbar.tsx

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    // <Nav>
    //     <ul>
    //         <li>
    //             <Link to="/app/orgs" className={pathname === '/app/orgs' ? 'active' : ''}>Orgs</Link>
    //         </li>
    //         <li>
    //             <Link to="/app/users" className={pathname === '/app/users' ? 'active' : ''}>Users</Link>
    //         </li>
    //         <li>
    //             <button onClick={handleLogout}>Logout</button>
    //         </li>
    //     </ul>
    // </Nav>
    <Nav fill pills>
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
          Logout
      </NavItem>
    </Nav>
  );
};

export default Navbar;
