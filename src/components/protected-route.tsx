import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userId = localStorage.getItem('userId');

  if (!userId) {
    return <Navigate to="/" />;
  }
  return children;
};
