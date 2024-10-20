import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { AppRoutes } from "./routes";
import './App.css'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <FluentProvider theme={webLightTheme}>
      <Router>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Router>
    </FluentProvider>
  );
};

export default App;
