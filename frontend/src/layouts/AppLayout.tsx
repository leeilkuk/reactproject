import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useUiStore } from '../stores/uiStore';
import NavLeft from './NavLeft';

const AppLayout = () => {
  const { menuPlacement, themeColor, bgImageUrl } = useUiStore();

  useEffect(() => {
    document.documentElement.style.setProperty('--app-accent', themeColor);
    if (bgImageUrl) {
      document.documentElement.style.setProperty('--app-bg-image', `url(${bgImageUrl})`);
      document.body.classList.add('app-bg');
    } else {
      document.documentElement.style.setProperty('--app-bg-image', 'none');
      document.body.classList.remove('app-bg');
    }
  }, [themeColor, bgImageUrl]);

  return (
    <div className={`app-layout placement-${menuPlacement}`}>
      <NavLeft />
      <main className="container-fluid p-4">
        {/* Breadcrumbs can be added here later */}
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
