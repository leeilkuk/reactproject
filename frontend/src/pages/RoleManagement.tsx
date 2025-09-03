import { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { Role } from '../types';

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get('/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Failed to fetch roles', error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <div>
      <h2>Role Management</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.description}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
