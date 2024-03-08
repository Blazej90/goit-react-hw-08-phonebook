import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/LayoutPage/Layout';
import PrivateRoute from './components/PrivateRoute';
import RestrictedRoute from './components/RestrictedRoute';
import { refreshToken } from './redux/auth/authSlice';
import { useAuth } from './hooks';
import { fetchContacts } from './redux/contactsSlice';
import Home from './pages/Home';
import Register from './pages/Register';
// import RegisterForm from 'components/RegisterForm';
import Login from './pages/Login';
import Phonebook from './pages/Phonebook';

const App = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    if (isLoggedIn) dispatch(fetchContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="phonebook"
          element={
            <PrivateRoute redirectTo="/login" component={<Phonebook />} />
          }
        />
        <Route
          path="/register"
          element={<RestrictedRoute component={<Register />} redirectTo="/" />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<Login />} redirectTo="/" />}
        />
      </Route>
    </Routes>
  );
};

export default App;
