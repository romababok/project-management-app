import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const userId = localStorage.getItem('userId');
  const Id = useAppSelector((state) => state.auth.userData._id);

  if (!userId) {
    return <Navigate to="/" />;
  }
  return children;
};
