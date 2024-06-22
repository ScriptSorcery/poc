import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Orgs from './components/Orgs';
import Users from './components/Users';
import { AuthProvider } from './AuthContext';
import UserForm from './components/UserForm';

const App: React.FC = () => {
    return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<UserForm />} />
                  <Route path="/orgs" element={<Orgs />} />
                  <Route path="/users" element={<Users />} />
              </Routes>
          </Router>
      </AuthProvider>
    );
};

export default App;
