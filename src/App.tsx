import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
import { AppRoutes } from "./routes";
import "./App.css";
import "./styles/mobilePage.css";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="page-container">
        <div className="page-border">
        <Router>
          <AppRoutes
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </Router>
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
