"use client";

import "./Login.css";
import { authUser } from "../../Services/authService";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCredsCorrect, setIsCredCorrect] = useState(true);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  async function sendAuthentication(e) {
    e.preventDefault();

    const response = await authUser(username, password);

    if (response) {
      setIsCredCorrect(true);
      SetIsAuthenticated(true);
      window.location.href = "/";
    } else {
      setIsCredCorrect(false);
    }
  }

  return (
    <main>
      <div className="login">
        {!isAuthenticated ? (
          <>
            <form className="login-form" onSubmit={sendAuthentication}>
              <h1>Please Authenticate To Access Resources.</h1>
              <div className="username">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Login
              </button>
              {!isCredsCorrect && (
                <p className="login-incorrect">
                  Username Or Passowrd Is Incorrect!
                </p>
              )}
            </form>
          </>
        ) : (
          <h1 className="login-authenticated">You Are Authenticated!</h1>
        )}
      </div>
    </main>
  );
}
