import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import apiClient from '../api/axios';
import { useAuthStore } from '../stores/authStore';

// Define the type for menu items, mirroring the backend type
interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
}

const NavLeft = () => {
  const { logout } = useAuthStore();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const location = useLocation();

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
        // This is a parent item with a submenu
        const isParentActive = location.pathname.startsWith(item.children[0].path?.substring(0, item.children[0].path.lastIndexOf('/')) || '');
        return (
          <li key={item.id} className="nav-item">
            <a
              className={`nav-link ${isParentActive ? '' : 'collapsed'}`}
              href={`#submenu-${item.id}`}
              data-bs-toggle="collapse"
              aria-expanded={isParentActive}
            >
              {item.label}
            </a>
            <div className={`collapse ${isParentActive ? 'show' : ''}`} id={`submenu-${item.id}`}>
              <ul className="nav flex-column ps-3">
                {renderMenuItems(item.children)}
              </ul>
            </div>
          </li>
        );
      }
      // This is a regular menu item
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
    <nav id="sidebar" className="bg-light border-end d-flex flex-column">
      <div className="sidebar-header p-3 mb-3 border-bottom">
        <h4>My App</h4>
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
