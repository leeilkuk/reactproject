import { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { Menu } from '../types';

const MenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await apiClient.get('/menus');
        // This returns a tree, we need to flatten it for this simple table view
        const flattened: Menu[] = [];
        const flatten = (items: Menu[]) => {
          items.forEach(item => {
            flattened.push(item);
            if (item.children) {
              flatten(item.children);
            }
          });
        };
        flatten(response.data);
        setMenus(flattened);
      } catch (error) {
        console.error('Failed to fetch menus', error);
      }
    };
    fetchMenus();
  }, []);

  return (
    <div>
      <h2>Menu Management</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Path</th>
            <th>Type</th>
            <th>Icon</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>{menu.path}</td>
              <td>{menu.type}</td>
              <td><i className={`bi ${menu.icon}`}></i> {menu.icon}</td>
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

export default MenuManagement;
