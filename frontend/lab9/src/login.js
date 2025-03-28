import React, {useState} from "react"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit = {handleSubmit}>
                <input
                    type = "text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </form>
        </div>

    )
}

export default Login;