import { Navigate } from 'react-router-dom';

interface protectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

const protectedRoute: React.FC<protectedRouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default protectedRoute;
