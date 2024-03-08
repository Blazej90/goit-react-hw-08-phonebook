import React from 'react';
import { useAuth } from 'hooks';

import styles from './Home.module.css';

const Home = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div className={styles.conainerHome}>
      <h1>Welcome to the application Phonebook</h1>
      <p>This is Home page</p>
      {isLoggedIn && <p>Welcome back, {user.name}!</p>}
    </div>
  );
};

export default Home;
