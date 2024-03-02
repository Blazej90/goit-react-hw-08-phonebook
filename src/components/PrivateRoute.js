import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const PrivateRoute = ({ redirectTo, ...props }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Route {...props} /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
