import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserType } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: UserType | UserType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  userType 
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userType) {
    const allowedTypes = Array.isArray(userType) ? userType : [userType];
    
    if (!allowedTypes.includes(user.userType)) {
      // Redirect to the appropriate dashboard based on user type
      return <Navigate to={`/${user.userType}/dashboard`} replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;