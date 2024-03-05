import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './hooks';

const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <NavLink to="/register" activeClassName="active">
              Register
            </NavLink>
          </li>
        )}

        {!isLoggedIn && (
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <NavLink to="/contacts" activeClassName="active">
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
