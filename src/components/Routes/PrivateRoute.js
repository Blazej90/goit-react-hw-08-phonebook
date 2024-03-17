import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';

const PrivateRoute = ({ redirectTo, component: Component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
