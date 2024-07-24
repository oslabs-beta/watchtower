import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// Set up of private routes throughout the React App

const PrivateRoute = () => {
  const user = useAuth();
  //   if (user){
  if (!user.token) return <Navigate to='/' />;
  return <Outlet />;
  //   }
};

export default PrivateRoute;
