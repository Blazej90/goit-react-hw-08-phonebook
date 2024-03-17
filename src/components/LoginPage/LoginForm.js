import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { loginUser } from '../../redux/auth/authSlice';
import { useAuth } from 'hooks';

import styles from './LoginForm.module.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await dispatch(loginUser({ email, password }));

      onLoginSuccess();
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
    }

    setEmail('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div>
        <p>You are already logged in!</p>
      </div>
    );
  }

  return (
    <div className={styles.containerCentered}>
      <div className={styles.containerLogin}>
        {' '}
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div>
          <h2>Log in</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.containerLoginInputs}>
          {' '}
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className={styles.togglePasswordBtn}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
