import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { loginSuccess, loginFailure } from '../redux/userSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      const response = await fetch('https://connections-api.herokuapp.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();

        dispatch(loginSuccess(userData));
      } else {
        const errorMessage = await response.text();

        dispatch(loginFailure(errorMessage));
      }
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
