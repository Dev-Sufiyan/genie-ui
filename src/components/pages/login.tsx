import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../custome";
import "../../styles/font.css";
import { PrimaryButton, Stack } from "@fluentui/react";
import { Input, Label } from "@fluentui/react-components";
import "../../styles/login-box.css";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>(""); // State to hold validation error messages

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation to ensure fields are not empty
    if (!username || !password) {
      setError("Both fields are required."); // Set error message if validation fails
      return;
    }

    setError(""); // Clear error message if validation passes
    if (username === "admin" && password === "admin@123") {
      setIsAuthenticated(true);
      navigate("/sucessLogin");
    }
    else{
      setError("Invalid Login Credential."); // Set error message if validation fails
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="box-container">
      <div className="login-box">
        <Logo />
        <div className="font-container">
          <div className="font-center-lg">Sign in to continue</div>
        </div>
        <form noValidate autoComplete="off" onSubmit={handleLogin}>
          <Stack tokens={{ childrenGap: 10 }}>
            <div>
              <Label htmlFor="username">
                Username <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="text" // Changed to text for username
                id="username" // Added id for accessibility
                value={username} // Fixed the value from email to username
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">
                Password <span style={{ color: "red" }}>*</span>
              </Label>
              <Input
                type="password"
                value={password} // Changed from defaultValue to value for controlled input
                id="password" // Added id for accessibility
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
                required
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}{" "}
            {/* Display error message if any */}
            <PrimaryButton type="submit" style={{ width: "100%" }}>
              Login
            </PrimaryButton>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default Login;
