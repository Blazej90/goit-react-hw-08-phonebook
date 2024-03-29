import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/LayoutPage/Layout';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import { refreshToken } from './redux/auth/authSlice';
import Home from './pages/HomePage/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Phonebook from './pages/Phonebook';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/register"
          element={<RestrictedRoute component={<Register />} redirectTo="/" />}
        />
        <Route
          path="/login"
          element={<RestrictedRoute component={<Login />} redirectTo="/" />}
        />
        <Route
          path="/phonebook"
          element={
            <PrivateRoute redirectTo="/login" component={<Phonebook />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
