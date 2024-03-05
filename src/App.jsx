import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { refreshToken } from './redux/auth/authSlice';
import { useAuth } from './hooks';
import UserMenu from './components/UserMenu';
import { loginUser, registerUser } from './redux/auth/authSlice'; // Dodaj importy akcji logowania i rejestracji

// Lazily import components
const HomePage = lazy(() => import('./pages/Home'));
const RegisterForm = lazy(() => import('./pages/Register'));
const LoginForm = lazy(() => import('./pages/Login'));
const TasksPage = lazy(() => import('./pages/Tasks'));

const App = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  // Funkcje logowania i rejestracji użytkownika
  const handleLogin = credentials => {
    dispatch(loginUser(credentials));
  };

  const handleRegister = userData => {
    dispatch(registerUser(userData));
  };

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              handleRegister={handleRegister}
              redirectTo="/contacts"
              component={<RegisterForm />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/tasks"
              component={LoginForm}
              handleLogin={handleLogin}
            />
          }
        />
        <Route
          path="/tasks"
          element={<PrivateRoute redirectTo="/login" component={TasksPage} />}
        />
      </Route>
      <Route
        path="/contacts"
        element={
          <Layout>
            <UserMenu />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
