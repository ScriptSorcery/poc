import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getOrganizations } from "../api";

const Orgs: React.FC = () => {
  const { token } = useAuth();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        //@ts-ignore
        const data = await getOrganizations(token);
        console.log(data);
        setOrgs(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };
    if (token) {
      fetchOrganizations();
    }
  }, [token]);

  return (
    <div>
      <h1>Orgs</h1>
      <table>
        <thead>
          <th>
            <td>Org_Id</td>
            <td>Org_Name</td>
          </th>
        </thead>
        <tbody>
          {(orgs || []).map((org: any) => (
            <tr key={org.id}>
              <td>{org.id}</td>
              <td>{org.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orgs;
