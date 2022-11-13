import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token)
    return (
      <Navigate to="/home" replace={true} state={{ from: location.pathname }} />
    );
  return children;
};
export default ProtectedRoute;
