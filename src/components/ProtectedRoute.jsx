import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.userData); // User info
  const isLoading = useSelector((state) => state.auth.loading); // Loading state

  // If still loading, show a loader or placeholder
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if the user is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content if user is logged in
  return children;
};

export default ProtectedRoute;
