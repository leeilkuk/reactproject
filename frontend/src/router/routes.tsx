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
import PayMonthlyManage from '../pages/PayMonthlyManage';
import PayMonthlyReport from '../pages/PayMonthlyReport';
import AdminUsers from '../pages/AdminUsers';
import AdminRoles from '../pages/AdminRoles';
import SettingsTheme from '../pages/SettingsTheme';

/**
 * A component to protect routes that require authentication.
 * If the user is not authenticated, it redirects to the /login page.
 */
const ProtectedRoute = () => {
  const { token } = useAuthStore.getState(); // Use getState for immediate value in router setup
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

/**
 * The main router component for the application.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes will be rendered inside AppLayout's Outlet */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pay/monthly/manage" element={<PayMonthlyManage />} />
          <Route path="pay/monthly/report" element={<PayMonthlyReport />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/roles" element={<AdminRoles />} />
          <Route path="settings/theme" element={<SettingsTheme />} />
          {/* Redirect from /app to /app/dashboard */}
          <Route index element={<Navigate to="/app/dashboard" replace />} />
        </Route>

        {/* Redirect root to /app or /login based on auth state */}
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
