import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If no user is logged in, redirect to the patient login page
    return <Navigate to="/patient-login" />;
  }

  // If a user is logged in, show the page they were trying to access
  return children;
};

export default ProtectedRoute;
