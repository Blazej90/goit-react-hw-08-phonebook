import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const RestrictedRoute = ({ redirectTo, ...props }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : <Route {...props} />;
};

export default RestrictedRoute;
