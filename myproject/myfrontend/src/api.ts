import axios from 'axios';
import { useAuth } from './AuthContext';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${API_URL}/token/`, { username, password });
    return response.data;
};

export const getOrganizations = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/organizations/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        throw error;
    }
};

export const createUser = async (token: string, username: string, email: string, password: string, organizationId: number) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, {
            username,
            email,
            password,
            organization: organizationId,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getUsers = (token: string) => {
    return axios.get(`${API_URL}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
