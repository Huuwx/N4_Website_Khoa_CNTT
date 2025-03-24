import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles?: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('role');

  if (!token) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole || '')) {
    // Role not authorized, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Authorized, render component
  return <Outlet />;
};

export default PrivateRoute;