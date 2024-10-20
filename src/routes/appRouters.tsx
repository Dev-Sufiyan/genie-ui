import { Routes, Route } from 'react-router-dom';
import { Login, Home , SucessLogin} from '../components/pages';
import { ProtectedRoute } from '.';

interface AppRoutesProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/sucessLogin" element={<SucessLogin/>} />
      <Route
        path="*"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
