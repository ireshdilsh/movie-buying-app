/* eslint-disable react-hooks/error-boundaries */
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');

  // Check if user is authenticated
  if (!token || !userString) {
    return <Navigate to="/" replace />;
  }

  // Check role if specified
  if (requiredRole) {
    try {
      const user = JSON.parse(userString);
      if (user.role !== requiredRole) {
        // If user role doesn't match, redirect to appropriate dashboard
        if (user.role === 'admin') {
          return <Navigate to="/admin/dashboard" replace />;
        } else {
          return <Navigate to="/user/dashboard" replace />;
        }
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
