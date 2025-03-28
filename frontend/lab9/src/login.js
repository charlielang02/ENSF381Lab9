import React, { useState, useEffect } from "react";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/validate_login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await response.json();
      setLoginSuccessful(data.success);
      if (data.success === false) {
        setMessage(data.message);
        console.log("false");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  useEffect(() => {
    if (loginSuccessful) {
      window.location.href = "/predict";
    }
  }, [loginSuccessful]);

  return (
    <div className="form-container">
      <h2>Login</h2>
      <div className="form-item">
        <label htmlFor="username">Username</label>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </form>
      </div>
      <div className="form-item">
        <label htmlFor="Password">Password</label>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </form>
      </div>
      <div className="form-item">
        <form onSubmit={handleSubmit}>
          <button type="submit">Login</button>
        </form>
      </div>
      {!loginSuccessful && message && (
        <div className="error-message">Error: {message}</div>
      )}
    </div>
  );
}

export default Login;
