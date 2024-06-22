import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { getUsers } from '../api';

const Users: React.FC = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (token) {
                const response = await getUsers(token);
                setUsers(response.data);
            }
        };
        fetchUsers();
    }, [token]);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {(users || []).map((user: any) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
