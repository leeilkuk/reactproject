import { Link, useLocation } from 'react-router-dom';

// A simple utility to generate breadcrumbs from the path
// In a real app, this would be more robust, likely using menu data
const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split('/').filter(Boolean); // filter out empty strings
  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // Capitalize the segment for display
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { path, label };
  });
  return breadcrumbs;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  // Don't show breadcrumbs on the dashboard root
  if (location.pathname === '/app/dashboard' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <li
            key={crumb.path}
            className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            {index === breadcrumbs.length - 1 ? (
              crumb.label
            ) : (
              <Link to={crumb.path}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
