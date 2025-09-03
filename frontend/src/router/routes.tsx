import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// Layouts
import AppLayout from '../layouts/AppLayout';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import RoleManagement from '../pages/RoleManagement';
import MenuManagement from '../pages/MenuManagement';

const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin/users" element={<UserManagement />} />
            <Route path="admin/roles" element={<RoleManagement />} />
            <Route path="admin/menus" element={<MenuManagement />} />
            <Route index element={<Navigate to="/app/dashboard" replace />} />
          </Route>
        </Route>
        <Route
          path="/"
          element={
            useAuthStore.getState().token ? (
              <Navigate to="/app/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
