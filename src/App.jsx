import React, { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import {
  refreshUserStart,
  refreshUserSuccess,
  loginUserStart,
  loginUserSuccess,
  logoutUserStart,
  logoutUserSuccess,
} from './redux/auth/operations';
import { useAuth } from './hooks';
import UserMenu from './components/UserMenu';

// Lazily import components
const HomePage = lazy(() => import('./pages/Home'));
const RegisterPage = lazy(() => import('./pages/Register'));
const LoginPage = lazy(() => import('./pages/Login'));
const TasksPage = lazy(() => import('./pages/Tasks'));

const App = () => {
  const { isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserStart());

    setTimeout(() => {
      dispatch(refreshUserSuccess({ id: 1, name: 'John Doe' }));
    }, 2000);

    // setTimeout(() => {
    //   dispatch(refreshUserFailure('Error occurred while refreshing user'));
    // }, 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(loginUserStart());

    setTimeout(() => {
      dispatch(loginUserSuccess({ id: 1, name: 'John Doe' }));
    }, 2000);

    // setTimeout(() => {
    //   dispatch(loginUserFailure('Error occurred while logging in'));
    // }, 2000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(logoutUserStart());

    setTimeout(() => {
      dispatch(logoutUserSuccess());
    }, 2000);

    // setTimeout(() => {
    //   dispatch(logoutUserFailure('Error occurred while logging out'));
    // }, 2000);
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
