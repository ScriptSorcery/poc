import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
//@ts-ignore
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('token') || null);

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (token: string) => {
        setToken(token);
        Cookies.set('token', token, { expires: 7 }); // Set cookie with expiration time (7 days)
    };

    const logout = () => {
        setToken(null);
        Cookies.remove('token');
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
