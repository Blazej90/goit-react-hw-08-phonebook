import React from 'react';

const UserMenu = ({ userEmail, onLogout }) => {
  return (
    <div>
      <p>{userEmail}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
