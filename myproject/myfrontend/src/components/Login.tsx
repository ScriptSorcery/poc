import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

import '../App.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await login(username, password);
        authLogin(data.access);
        navigate('/app/orgs');
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-field">
                <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <label>Enter your email</label>
            </div>
            <div className="input-field">
                <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <label>Enter your password</label>
            </div>
            <button className='mt-4' type="submit">Log In</button>
            <div className="register">
                <p>Don't have an account? <a href="#">Register</a></p>
            </div>
            </form>
        </div>
        );
    };

export default Login;
