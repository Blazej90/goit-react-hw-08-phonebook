import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { registerUser } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import styles from './RegisterForm.module.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await dispatch(registerUser({ name, email, password }));
      console.log('Rejestracja udana!');
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Błąd rejestracji:', error.message);
    }
    setName('');
    setEmail('');
    setPassword('');
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.containerRegister}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div>
        <h2>Create your account</h2>
      </div>
      {registrationSuccess ? (
        <div>
          <p>
            Great! You have just created your account. Log in with the correct
            information.
          </p>
          <button onClick={redirectToLogin}>Go to Login</button>{' '}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={styles.containerRegisterInputs}
        >
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
