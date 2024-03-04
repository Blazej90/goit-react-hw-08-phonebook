import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserStart } from '../redux/auth/operations';
import { selectUser } from '../redux/auth/selectors';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUserStart());
  };

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
