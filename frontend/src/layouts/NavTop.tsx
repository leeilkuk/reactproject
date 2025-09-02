import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuthStore } from '../stores/authStore';

interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

const NavTop = () => {
  const { logout } = useAuthStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await apiClient.get('/menus');
        if (response.data.ok) {
          setMenuItems(response.data.menus);
        }
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    };
    fetchMenus();
  }, []);

  const renderMenuItems = (items: MenuItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <li key={item.id} className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {item.label}
            </a>
            <ul className="dropdown-menu">
              {renderMenuItems(item.children)}
            </ul>
          </li>
        );
      }
      return (
        <li key={item.id} className="nav-item">
          <NavLink to={item.path || '#'} className="nav-link">
            {item.label}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/app">My App</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {renderMenuItems(menuItems)}
          </ul>
          <button className="btn btn-secondary" onClick={() => { logout(); window.location.href = '/login'; }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavTop;
