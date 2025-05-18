// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("isAuthenticated:", isAuthenticated); // Debugging
  if (isAuthenticated === null) return <div>Loading...</div>
  return isAuthenticated ? element : <Navigate to="/login" replace />;
  };

export default ProtectedRoute;
