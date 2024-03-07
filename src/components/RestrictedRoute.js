import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const RestrictedRoute = ({ redirectTo, component: Component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
