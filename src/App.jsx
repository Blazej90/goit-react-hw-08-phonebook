import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { useAuth } from './hooks';

const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register')); // Poprawiony import strony Register
const LoginPage = lazy(() => import('./pages/Login'));
const TasksPage = lazy(() => import('./pages/Tasks'));
const App = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={RegisterPage} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={LoginPage} />
          }
        />
        <Route
          path="/tasks"
          element={<PrivateRoute redirectTo="/login" component={TasksPage} />} // Poprawiony sposób przekazywania komponentu
        />
      </Route>
    </Routes>
  );
};

export default App;
