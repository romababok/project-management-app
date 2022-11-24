import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userData } = useAppSelector((state) => state.auth);

  if (!userData?.id) {
    return <Navigate to="/" />;
  }
  return children;
};
