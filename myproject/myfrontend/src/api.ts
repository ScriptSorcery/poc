import axios from 'axios';
import { notify } from 'react-notify-toast';

const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/token/`, { username, password });
      notify.show('Success!',"success", 2000);
      return response.data;
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        notify.show('Unauthorized!', 'error', 2000);
      } else {
        notify.show('An error occurred!', 'error', 2000);
      }
      throw error; // Re-throw the error so that it can be handled by the caller if needed
    }
  };

export const getOrganizations = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/organizations/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        throw error;
    }
};

export const createUser = async (username: string, email: string, password: string, organizationId: number) => {
    try {
        const response = await axios.post(`${API_URL}/users/`, {
            username,
            email,
            password,
            organization: organizationId,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getUsers = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/users/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
