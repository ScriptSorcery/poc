import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { getUsers } from "../api";
import { Table } from "reactstrap";

interface UserDetails {
  email: string;
  id: number;
  organization: string;
  username: string;
}

const Users: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserDetails[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (token) {
        const response = await getUsers(token);
        console.log(response)
        setUsers(response);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="wrapper">
      <Table className="custom-table">
        <thead>
          <tr>
            <td>User ID</td>
            <td>UserName</td>
            <td>Email</td>
            <td>Org</td>
          </tr>
        </thead>
        <tbody>
          {(users || []).map((user: UserDetails) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.organization ?? "0"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
