import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuthStore } from '../stores/authStore';
import { Menu } from '../types';

const NavLeft = () => {
  const { logout } = useAuthStore();
  const [menuItems, setMenuItems] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await apiClient.get('/menus');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    };
    fetchMenus();
  }, []);

  const renderMenuItems = (items: Menu[]) => {
    return items.map((item) => (
      <li key={item.id} className="nav-item">
        <NavLink to={item.path || '#'} className="nav-link">
          {item.name}
        </NavLink>
        {item.children && item.children.length > 0 && (
          <ul className="nav flex-column ps-3">
            {renderMenuItems(item.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav id="sidebar" className="bg-light border-end d-flex flex-column">
      <div className="sidebar-header p-3 mb-3 border-bottom">
        <h4>Role Admin</h4>
      </div>
      <ul className="nav flex-column">
        {renderMenuItems(menuItems)}
      </ul>
      <div className="mt-auto p-3">
        <button className="btn btn-secondary w-100" onClick={() => { logout(); window.location.href = '/login'; }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavLeft;
