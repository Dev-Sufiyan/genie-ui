import { Routes, Route } from "react-router-dom";
import { Login, Home, SucessLogin } from "../components/pages";
import { ProtectedRoute } from ".";

interface AppRoutesProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  isAuthenticated,
  setIsAuthenticated,
}) => {
  return (
    <Routes>
      <Route path="/sucessLogin" element={<SucessLogin />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
    </Routes>
  );
};

export default AppRoutes;
