import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../custome";
import "../../styles/font.css";
import { PrimaryButton, Stack } from "@fluentui/react";
import { Input, Label } from "@fluentui/react-components";
import LoginHelper from "../util/LoginHelper";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setError("");
    try {
      const isValid = await new LoginHelper().validateCredentials(
        username,
        password
      );

      if (isValid) {
        setIsAuthenticated(true);
        navigate("/sucessLogin");
      } else {
        setError("Invalid Login Credential.");
        setIsAuthenticated(false);
      }
    } catch (error) {
      setError("Server error. Please try again later.");
      setIsAuthenticated(false);
    }
  };

  return (
    <div>
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
              type="text"
              id="username"
              value={username}
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
  );
};

export default Login;
