import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthUser } from '../utils/auth';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const user = getAuthUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
