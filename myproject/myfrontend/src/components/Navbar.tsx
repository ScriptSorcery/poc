// Navbar.tsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar: React.FC = () => {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/app/orgs" className={pathname === '/app/orgs' ? 'active' : ''}>Orgs</Link>
                </li>
                <li>
                    <Link to="/app/users" className={pathname === '/app/users' ? 'active' : ''}>Users</Link>
                </li>
                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
