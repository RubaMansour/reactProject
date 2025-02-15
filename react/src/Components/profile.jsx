// src/components/Profile.js
import React from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome, {user?.displayName || user?.email}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
