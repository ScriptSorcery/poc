import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/Login';
import UserForm from './components/UserForm';
import Navbar from './components/Navbar';
import Orgs from './components/Orgs';
import Users from './components/Users';
import Notification from 'react-notify-toast';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
            <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<UserForm />} />
                    {/* Routes that require the Navbar */}
                    <Route
                        path="/app/*"
                        element={
                            <>
                                <Navbar />
                                <Routes>
                                    <Route path="/orgs" element={<Orgs />} />
                                    <Route path="/users" element={<Users />} />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </Router>
            <Notification />
        </AuthProvider>
    );
};

export default App;
