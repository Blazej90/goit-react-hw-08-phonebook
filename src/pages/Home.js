import React from 'react';
import { useAuth } from 'hooks';

const Home = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is Home page</p>
      {isLoggedIn && <p>Welcome back, {user.name}!</p>}
    </div>
  );
};

export default Home;
