import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';
import { useAuth } from '../hooks';

const Layout = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <UserMenu />
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div>Home Page...</div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
