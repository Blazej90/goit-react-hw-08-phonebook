import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserMenu from '../UserMenu';
import { useAuth } from '../../hooks';

import styles from './Layout.module.css';

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <ul className={styles.containerNav}>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <UserMenu />
              </li>
            ) : (
              <>
                <li>
                  <Link to="/register" className={styles.navLink}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className={styles.navLink}>
                    Log In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
