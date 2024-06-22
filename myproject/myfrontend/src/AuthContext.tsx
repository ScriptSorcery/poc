import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null); // Retrieve token from localStorage if available

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem('token', token); // Save token to localStorage
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
