import React, {useState} from "react"
import "./login.css"

from flask_cors import CORS
from flask import Flask, request, jsonify

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loginSuccessful, setLoginSuccessful] = useState(false)

    

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('https://127.0.0.1:5000/validate_login', {
                method: 'POST',
                headers: { 'Content_Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });
            const data = await response.json();
            setLoginSuccessful(data.success)
            if (data.success === false) {
                setMessage(data.message)
                console.log("false")
            }
        }
        catch (error) {
            console.error('Error fetching prediction:', error);
        }

        if (loginSuccessful === true) {
            window.location.href = "/predict";
        }
    };

    return (
        <div className = "form-container">
            <h2>Login</h2>
            <div className="form-item">
                <label htmlFor="username">Username</label>
                <form onSubmit = {handleSubmit}>
                    <input
                        type = "text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <div class='error-message'>
                    Error: ${message}
                </div>
            )}
        </div>

    )
}

export default Login;