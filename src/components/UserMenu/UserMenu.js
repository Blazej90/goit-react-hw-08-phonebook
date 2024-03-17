import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authSlice';
import { useAuth } from '../../hooks';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.containerProfile}>
      {isLoading ? (
        <p>Loading user...</p>
      ) : user ? (
        <>
          <p>{user.email}</p>
          <div className={styles.containerLogout}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default UserMenu;
