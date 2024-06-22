// src/components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { getOrganizations, createUser } from '../api';

const UserForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organizationId, setOrganizationId] = useState<number | null>(null);
    const [organizations, setOrganizations] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const orgs = await getOrganizations();
                setOrganizations(orgs);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };
        fetchOrganizations();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!organizationId) return;

        try {
            await createUser(username, email, password, organizationId);
            // Optionally, add success message or redirect user after successful creation
            alert('User created successfully!');
            setUsername('');
            setEmail('');
            setPassword('');
            setOrganizationId(null);
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Organization:</label>
                <select value={organizationId ?? ''} onChange={(e) => setOrganizationId(parseInt(e.target.value))} required>
                    <option value="">Select Organization</option>
                    {organizations.map(org => (
                        <option key={org.id} value={org.id}>{org.name}</option>
                    ))}
                </select>
            </div>
            <button type="submit">Create User</button>
        </form>
    );
};

export default UserForm;
