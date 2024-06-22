import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getOrganizations } from "../api";
import { Table } from "reactstrap";

import "../App.css";

const Orgs: React.FC = () => {
  const { token } = useAuth();
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        //@ts-ignore
        const data = await getOrganizations(token);
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
    <div className="wrapper">
      <Table className="custom-table">
        <thead>
          <tr>
            <td>Org_Id</td>
            <td>Org_Name</td>
          </tr>
        </thead>
        <tbody>
          {(orgs || []).map((org: any) => (
            <tr key={org.id}>
              <td>{org.id}</td>
              <td>{org.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Orgs;
