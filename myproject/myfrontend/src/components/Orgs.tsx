import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { getOrganizations } from '../api';

const Orgs: React.FC = () => {
    const { token } = useAuth();
    const [orgs, setOrgs] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await getOrganizations();
            setOrgs(response.data);
        };
        fetchOrganizations();
    }, []);

    return (
        <div>
            <h1>Orgs</h1>
            <ul>
                {orgs.map((org: any) => (
                    <li key={org.id}>{org.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Orgs;
