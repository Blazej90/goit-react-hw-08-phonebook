import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/auth/authSlice';
import { useAuth } from '../hooks';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading user...</p>
      ) : user ? (
        <>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default UserMenu;
