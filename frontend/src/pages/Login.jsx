import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <>
            <Navbar />
            <div className="login-container">
                <form className="form-panel" onSubmit={handleSubmit}>
                    <h1>Log in</h1>

                    <label>Email:</label>
                    <input 
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label>Password:</label>
                    <input 
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div className="login-signup">Don't have an account yet? <NavLink to='/signup'>Sign up</NavLink></div>
                    <button>Log in</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )

}