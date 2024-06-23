import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
//@ts-ignore
import Cookies from 'js-cookie';

interface AuthContextType {
    token: string | null;
    user: any | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('token') || null);
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken)
            setUser({
                user_id: decodedToken.user_id,
            });
        }
    }, [token]);
    console.log(user)
    const login = (token: string) => {
        setToken(token);
        Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
        const decodedToken: any = jwtDecode(token);
        setUser({
            organization_id: decodedToken.organization_id,
            username: decodedToken.username,
        });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        Cookies.remove('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
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
