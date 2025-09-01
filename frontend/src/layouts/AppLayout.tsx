import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useUiStore } from '../stores/uiStore';
import NavTop from './NavTop';
import NavLeft from './NavLeft';
// import NavRight from './NavRight';
// import NavBottom from './NavBottom';
import Breadcrumbs from './Breadcrumbs';

const AppLayout = () => {
  const { menuPlacement, themeColor, bgImageUrl } = useUiStore();

  // Effect to update CSS variables and body class for theming
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

  const renderNav = () => {
    switch (menuPlacement) {
      case 'top':
        return <NavTop />;
      case 'left':
        return <NavLeft />;
      // case 'right':
      //   return <NavRight />;
      // case 'bottom':
      //   return <NavBottom />;
      default:
        return <NavLeft />;
    }
  };

  return (
    <div className={`app-layout placement-${menuPlacement}`}>
      {renderNav()}
      <main className="container-fluid p-4">
        <Breadcrumbs />
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
